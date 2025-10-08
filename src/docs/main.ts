import "./style.css";
import { renderAPISection } from "./ts/apiRenderer";

import { example } from "./ts/example";

window.addEventListener("DOMContentLoaded", () => {
  renderAPISection();
});

example();
