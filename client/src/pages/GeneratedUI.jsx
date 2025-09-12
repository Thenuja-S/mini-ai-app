import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function InputByType({ field, value, onChange }) {
  const type = field.type || "text";

  if (type === "boolean") {
    return (
      <label className="checkbox">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{field.label || field.name}</span>
      </label>
    );
  }

  if (type === "select" && Array.isArray(field.options)) {
    return (
      <select
        className="select"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>{field.placeholder || "Select…"}</option>
        {field.options.map((opt, i) => (
          <option key={i} value={opt.value ?? opt}>
            {"label" in opt ? opt.label : String(opt)}
          </option>
        ))}
      </select>
    );
  }

  const map = { number: "number", email: "email", date: "date", password: "password", url:"url" };
  const htmlType = map[type] || "text";

  if (type === "multiline" || type === "textarea") {
    return (
      <textarea
        className="textarea"
        placeholder={field.placeholder || ""}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <input
      className="input"
      type={htmlType}
      placeholder={field.placeholder || ""}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function EntityForm({ name, fields }) {
  const [data, setData] = useState({});

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`${name} submitted:
` + JSON.stringify(data, null, 2));
  };

  return (
    <form className="card form" onSubmit={onSubmit}>
      <div className="h2" style={{ marginBottom: 2 }}>{name}</div>
      <div className="grid grid--2">
        {fields.map((field, idx) => (
          <div className="field" key={idx}>
            {field.type !== "boolean" && (
              <label className="label">
                {field.label || field.name}
                {field.required ? " *" : ""}
              </label>
            )}
            <InputByType field={field} value={data[field.name]} onChange={(v) => set(field.name, v)} />
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:10, marginTop: 8 }}>
        <button className="btn" type="submit">Save</button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setData({})}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default function GeneratedUI() {
  const location = useLocation();
  const extracted = location.state?.extracted || {
    appName: "Sample App",
    entities: ["Entity"],
    features: ["Create", "Update", "List"],
    entitySchemas: {
      Entity: [
        { name: "title", label: "Title", type: "text", required: true, placeholder: "Enter title" },
        { name: "description", label: "Description", type: "multiline" },
        { name: "dueDate", label: "Due Date", type: "date" },
        { name: "priority", label: "Priority", type: "select", options: ["Low","Medium","High"] },
        { name: "completed", label: "Completed", type: "boolean" }
      ]
    }
  };

  const { appName, entities = [], features = [], entitySchemas = {} } = extracted;

  return (
    <div className="grid" style={{ marginTop: 18 }}>
      <div className="card card--soft">
        <div className="h1">{appName || "Generated UI"}</div>
        {features.length > 0 && (
          <div className="lead">
            <b>Features:</b> {features.join(", ")}
          </div>
        )}
      </div>

      <div className="grid">
        {entities.map((e) => {
          const fields = entitySchemas[e] || [];
          return <EntityForm key={e} name={e} fields={fields} />;
        })}
      </div>
    </div>
  );
}