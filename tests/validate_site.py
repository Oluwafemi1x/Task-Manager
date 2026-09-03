from __future__ import annotations

import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class SiteParser(HTMLParser):
    void_elements = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"}

    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.references: list[str] = []
        self.open_elements: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if element_id := attributes.get("id"):
            self.ids.append(element_id)
        for key in ("for", "aria-labelledby", "aria-describedby"):
            if reference := attributes.get(key):
                self.references.extend(reference.split())
        if tag not in self.void_elements:
            self.open_elements.append(tag)

    def handle_endtag(self, tag: str) -> None:
        if not self.open_elements or self.open_elements[-1] != tag:
            raise AssertionError(f"Invalid HTML nesting near </{tag}>")
        self.open_elements.pop()


def validate() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "styles.css").read_text(encoding="utf-8")
    javascript = (ROOT / "script.js").read_text(encoding="utf-8")

    parser = SiteParser()
    parser.feed(html)

    assert not parser.open_elements, f"Unclosed HTML elements: {parser.open_elements}"
    assert len(parser.ids) == len(set(parser.ids)), "Duplicate HTML id detected"
    assert set(parser.references) <= set(parser.ids), "Broken HTML accessibility reference"
    assert css.count("{") == css.count("}"), "Unbalanced CSS braces"

    for element_id in re.findall(r"getElementById\('([^']+)'\)", javascript):
        assert element_id in parser.ids, f"JavaScript references missing element: {element_id}"

    for asset in re.findall(r'(?:href|src)="([^"#]+)', html):
        if not asset.startswith(("https://", "http://")):
            assert (ROOT / asset).is_file(), f"Missing local asset: {asset}"


if __name__ == "__main__":
    validate()
    print("Static site validation passed.")

