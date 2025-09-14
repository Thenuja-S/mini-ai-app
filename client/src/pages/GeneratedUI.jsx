import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function InputByType({ field, value, onChange }) {
  const type = field.type || "text";
  if (type === "boolean") {
    return (
      <label className="checkbox">
        <input
          id={field.id}
          name={field.name}
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
        id={field.id}
        name={field.name}
        className="select"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          {field.placeholder || "Select…"}
        </option>
        {field.options.map((opt, i) => (
          <option key={i} value={opt.value ?? opt}>
            {"label" in opt ? opt.label : String(opt)}
          </option>
        ))}
      </select>
    );
  }

  if (type === "multiline" || type === "textarea") {
    return (
      <textarea
        id={field.id}
        name={field.name}
        className="textarea"
        placeholder={field.placeholder || ""}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  //If default values
  const map = {
    number: "number",
    email: "email",
    date: "date",
    password: "password",
    url: "url",
  };
  const htmlType = map[type] || "text";
  return (
    <input
      id={field.id}
      name={field.name}
      className="input"
      type={htmlType}
      placeholder={field.placeholder || ""}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function EntityForm({ name, fields }) {
  const [values, setValues] = useState(() => fields.map(() => undefined));
  const setValueAt = (idx, value) =>
    setValues((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = fields.reduce((obj, field, idx) => {
      obj[field.name] = values[idx];
      return obj;
    }, {});
    alert(`${name} submitted:\n` + JSON.stringify(payload, null, 2));
  };

  return (
    <form className="card form" onSubmit={onSubmit}>
      <div className="h2" style={{ marginBottom: 2 }}>
        {name}
      </div>
      <div className="grid grid--2">
        {fields.map((field, idx) => {
          const inputId = `${name}-${field.name}`;
          return (
            <div className="field" key={field.name}>
              {field.type !== "boolean" && (
                <label className="label" htmlFor={inputId}>
                  {field.label || field.name}
                  {field.required ? " *" : ""}
                </label>
              )}
              <InputByType
                field={{ ...field, id: inputId }}
                value={values[idx]}
                onChange={(v) => setValueAt(idx, v)}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button className="btn" type="submit">
          Save
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setValues(() => fields.map(() => undefined))}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default function GeneratedUI() {
  const { state } = useLocation();
  const extracted = state?.extracted || {
    appName: "Sample App",
    entities: ["Entity"],
    features: ["Create", "Update", "List"],
    entitySchemas: {
      Entity: [{ name: "title", label: "Title", type: "text", required: true }],
    },
  };
  const {
    appName,
    entities = [],
    features = [],
    entitySchemas = {},
  } = extracted;
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
        {entities.map((e) => (
          <EntityForm key={e} name={e} fields={entitySchemas[e] || []} />
        ))}
      </div>
    </div>
  );
}
