import React, { useState } from "react";
import { api } from "../api/http.js";
import { useNavigate } from "react-router-dom";

export default function Requirement() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setResult(null);
    setBusy(true);
    try {
      const { data } = await api.post("/ai/extract", { prompt });
      setResult(data.extracted);
    } catch (ex) {
      const msg = ex?.response?.data?.error || ex?.message || "Extraction failed";
      setErr(msg);
    } finally {
      setBusy(false);
    }
  };

  const entities = result?.entities ?? [];
  const roles = result?.roles ?? [];
  const features = result?.features ?? [];
  const schemas = result?.entitySchemas ?? null;

  return (
    <div className="grid" style={{ marginTop: 18 }}>
      <div className="card card--soft">
        <div className="h1">Requirement</div>
        <div className="lead">
          Describe your requirement. We’ll extract entities, roles, features, and field schemas.
        </div>
        <form className="form" onSubmit={submit}>
          <div className="field">
            <label className="label" htmlFor="prompt">Your requirement</label>
            <textarea
              id="prompt"
              className="textarea"
              rows={6}
              placeholder='Describe your app (e.g., "I want an app to manage student courses and grades...")'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" type="submit" disabled={busy || !prompt.trim()}>
              {busy ? "Analyzing…" : "Extract with AI"}
            </button>
            {result && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => navigate("/generated", { state: { extracted: result } })}
              >
                Generate Mock UI
              </button>
            )}
          </div>
        </form>

        {err && <div className="alert alert--error" style={{ marginTop: 12 }}>{err}</div>}
      </div>

      {result && (
        <div className="card">
          <div className="h2">Extraction Summary</div>
          <div className="schema" style={{ marginTop: 8 }}>
            {"appName" in result && (
              <div className="schema__row">
                <div className="schema__key">App Name</div>
                <div className="schema__val">{result.appName || "—"}</div>
              </div>
            )}

            {!!roles.length && (
              <div className="schema__row">
                <div className="schema__key">Roles</div>
                <div className="schema__val">
                  <div className="kv">
                    {roles.map((r, i) => <span key={i} className="kv__item">{r}</span>)}
                  </div>
                </div>
              </div>
            )}

            {!!features.length && (
              <div className="schema__row">
                <div className="schema__key">Features</div>
                <div className="schema__val">
                  <div className="kv">
                    {features.map((f, i) => <span key={i} className="kv__item">{f}</span>)}
                  </div>
                </div>
              </div>
            )}

            {!!entities.length && (
              <div className="schema__row">
                <div className="schema__key">Entities</div>
                <div className="schema__val">
                  <div className="kv">
                    {entities.map((e, i) => <span key={i} className="kv__item">{e}</span>)}
                  </div>
                </div>
              </div>
            )}

            {schemas && (
              <div className="schema__row" style={{ gridTemplateColumns: "1fr" }}>
                <div className="schema__key" style={{ gridColumn: "1/-1" }}>Entity Schemas</div>
                <div className="schema__val" style={{ gridColumn: "1/-1" }}>
                  {Object.entries(schemas).map(([entity, fields]) => (
                    <div key={entity} style={{ marginBottom: 10 }}>
                      <div className="h2" style={{ marginTop: 4 }}>{entity}</div>
                      <div className="kv" style={{ marginTop: 6 }}>
                        {(fields ?? []).map((f, i) => (
                          <span className="kv__item" key={i}>
                             {(f.label ?? f.name) || "field"}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button
              className="btn"
              type="button"
              onClick={() => navigate("/generated", { state: { extracted: result } })}
            >
              Generate Mock UI
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => setResult(null)}>
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}