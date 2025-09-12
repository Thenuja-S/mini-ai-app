import OpenAI from "openai";
import { z } from "zod";
import { env } from "../config/env.js";

//Initialize the OpenAI client. 
const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });


//Calls the OpenAI to extract entity and features

export async function extractRequirements({ prompt }) {
  const system = `You are a requirements extraction assistant.
Return ONLY JSON that matches the provided schema.
Infer entities, roles, features, AND 'entitySchemas' from the user's requirement text.
For each entity, produce 3–8 field objects with keys: label, type, relation.
- type ∈ {text,email,number,date,time,url,password,boolean,select}
- For relations (e.g., "Student" on Grade), use type:"select" and relation:"Student".
- For non-relations, relation MUST be "" (empty string).`;

  const user = `Requirement Description:\n${prompt}`;

  //Build field item schema
  const fieldItem = {
    type: "object",
    properties: {
      label:    { type: "string" },
      type:     { type: "string", enum: ["text","email","number","date","time","url","password","boolean","select"] },
      relation: { type: "string" } 
    },
    required: ["label", "type", "relation"],
    additionalProperties: false
  };

  //Root properties
  const properties = {
    appName:  { type: "string" },
    entities: { type: "array", items: { type: "string" } },
    roles:    { type: "array", items: { type: "string" } },
    features: { type: "array", items: { type: "string" } },
    entitySchemas: {
      type: "object",
      description: "Map of entity -> array of field objects",
      additionalProperties: {
        type: "array",
        items: fieldItem
      }
    }
  };

  //Derive required strictly from property keys
  const schemaToSend = {
    type: "object",
    properties,
    required: Object.keys(properties),
    additionalProperties: false
  };


  const resp = await client.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "RequirementExtract",
        schema: schemaToSend
       
      }
    }
  });

  const json = JSON.parse(resp.choices?.[0]?.message?.content || "{}");

  const FieldSchema = z.object({
    label: z.string(),
    type: z.enum(["text","email","number","date","time","url","password","boolean","select"]),
    relation: z.string()
  });

  const RequirementSchema = z.object({
    appName: z.string(),
    entities: z.array(z.string()),
    roles: z.array(z.string()),
    features: z.array(z.string()),
    entitySchemas: z.record(z.array(FieldSchema))
  });

  const parsed = RequirementSchema.safeParse(json);
  if (!parsed.success) {
    throw new Error("OpenAI schema mismatch: " + JSON.stringify(parsed.error.issues, null, 2));
  }
  return parsed.data;
}