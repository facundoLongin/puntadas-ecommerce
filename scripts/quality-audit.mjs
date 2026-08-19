import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
const routes = ["/", "/productos", "/registro", "/ingresar", "/guia-de-medidas"];

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match?.[1] ?? "";
}

function getTitle(html) {
  return stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
}

function getMetaDescription(html) {
  return html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1] ?? "";
}

function getTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>[\\s\\S]*?<\\/${tagName}>`, "gi"))].map((match) => match[0]);
}

function getSelfClosingTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

async function fetchHtml(route) {
  const response = await fetch(`${baseUrl}${route}`);

  assert.equal(response.status, 200, `${route} debe responder 200`);
  assert.ok(response.headers.get("content-type")?.includes("text/html"), `${route} debe devolver HTML`);

  return response.text();
}

test("site exposes basic SEO metadata on key routes", async () => {
  for (const route of routes) {
    const html = await fetchHtml(route);
    const title = getTitle(html);
    const description = getMetaDescription(html);

    assert.ok(title.length >= 10, `${route} debe tener title descriptivo`);
    assert.ok(title.includes("Puntadas"), `${route} debe incluir Puntadas en title`);
    assert.ok(description.length >= 30, `${route} debe tener meta description descriptiva`);
    assert.ok(/<html[^>]+lang=["']es["']/i.test(html), `${route} debe declarar lang=es`);
  }
});

test("key routes keep basic accessibility structure", async () => {
  for (const route of routes) {
    const html = await fetchHtml(route);
    const h1s = getTags(html, "h1").map(stripTags).filter(Boolean);
    const images = getSelfClosingTags(html, "img");
    const buttons = getTags(html, "button");
    const links = getTags(html, "a");

    assert.ok(h1s.length >= 1, `${route} debe tener al menos un h1`);

    for (const image of images) {
      assert.ok(getAttribute(image, "alt").trim().length > 0, `${route} tiene una imagen sin alt`);
    }

    for (const button of buttons) {
      const visibleText = stripTags(button);
      const label = getAttribute(button, "aria-label") || getAttribute(button, "title") || visibleText;
      assert.ok(label.trim().length > 0, `${route} tiene un button sin nombre accesible`);
    }

    for (const link of links) {
      const visibleText = stripTags(link);
      const label = getAttribute(link, "aria-label") || getAttribute(link, "title") || visibleText;
      assert.ok(label.trim().length > 0, `${route} tiene un link sin nombre accesible`);
    }
  }
});
