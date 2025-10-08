interface Property {
  name: string;
  type?: string;
  desc?: string;
  protected?: boolean;
}

interface MethodParam {
  name: string;
  type?: string;
  desc?: string;
}

interface Method {
  name: string;
  params?: MethodParam[];
  returns?: string;
  desc?: string;
}

interface ClassData {
  description?: string;
  extends?: string | null;
  dependsOn?: string[];
  properties?: Property[];
  methods?: Method[];
}

type APIRegistry = Record<string, ClassData>;

import { apiRegistry } from "./apiRegistry";

function createPropertyTable(properties?: Property[]) {
  if (!properties?.length) return null;
  const table = document.createElement("table");
  table.className = "api-table";
  table.innerHTML = `
    <thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      ${properties
        .map(
          (p) =>
            `<tr>
              <td>${p.name}${p.protected ? " <em>(protected)</em>" : ""}</td>
              <td><code>${p.type || "&nbsp;"}</code></td>
              <td>${p.desc || "&nbsp;"}</td>
            </tr>`
        )
        .join("")}
    </tbody>
  `;
  return table;
}

function createMethodTable(methods?: Method[]) {
  if (!methods?.length) return null;
  const table = document.createElement("table");
  table.className = "api-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Method</th>
        <th>Parameters</th>
        <th>Returns</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      ${methods
        .map((m) => {
          const params =
            m.params
              ?.map(
                (p) =>
                  `<code>${p.name}: ${p.type || "any"}</code> - ${p.desc || ""}`
              )
              .join("<br>") || "&nbsp;";
          const returns = m.returns || "&nbsp;";
          const desc = m.desc || "&nbsp;";
          return `<tr>
            <td><code>${m.name}</code></td>
            <td>${params}</td>
            <td>${returns}</td>
            <td>${desc}</td>
          </tr>`;
        })
        .join("")}
    </tbody>
  `;
  return table;
}

function createExpandableCard(name: string, data: ClassData): HTMLElement {
  const card = document.createElement("div");
  card.className = "api-expandable";
  const header = document.createElement("button");
  header.className = "api-header";
  header.innerHTML = `<span class="arrow">▶</span> ${name}`;
  header.onclick = () => {
    const section = card.parentElement;
    if (!section) return;
    section.querySelectorAll(".api-expandable").forEach((c) => {
      if (c !== card) c.classList.remove("open");
    });
    card.classList.toggle("open");
  };
  card.appendChild(header);

  const body = document.createElement("div");
  body.className = "api-body";

  if (data.description) {
    const desc = document.createElement("p");
    desc.textContent = data.description;
    body.appendChild(desc);
  }

  if (data.extends || data.dependsOn?.length) {
    const dep = document.createElement("p");
    dep.innerHTML = `
      ${data.extends ? `<strong>Extends:</strong> ${data.extends}` : ""}
      ${
        data.dependsOn?.length
          ? `<strong>Depends on:</strong> ${data.dependsOn.join(", ")}`
          : ""
      }
    `;
    body.appendChild(dep);
  }

  const propTable = createPropertyTable(data.properties);
  if (propTable) {
    const h4 = document.createElement("h4");
    h4.textContent = "Properties";
    body.appendChild(h4);
    body.appendChild(propTable);
  }

  const methodTable = createMethodTable(data.methods);
  if (methodTable) {
    const h4 = document.createElement("h4");
    h4.textContent = "Methods";
    body.appendChild(h4);
    body.appendChild(methodTable);
  }

  card.appendChild(body);
  return card;
}

export function renderAPISection() {
  const section = document.getElementById("api-ref");
  if (!section) return;
  const container = section.querySelector(".container");
  if (!container) return;
  container.innerHTML = "";
  for (const [className, data] of Object.entries(apiRegistry as APIRegistry)) {
    container.appendChild(createExpandableCard(className, data));
  }
}
