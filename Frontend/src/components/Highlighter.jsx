import { useEffect } from "react";
import { useSearch } from "./SearchContext";

const Highlighter = ({ children }) => {
  const { searchQuery } = useSearch();

  useEffect(() => {
    if (!searchQuery.trim()) {
      removeHighlights();
      return;
    }
    highlightMatches(searchQuery);
  }, [searchQuery]);

  const highlightMatches = (query) => {
    query=query.slice(-1)
    if (!query || query==" ") return;
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp((\\b${safeQuery}), "gi");
    const walk = (node) => {
      if (node.nodeType === 3) {
        const parent = node.parentNode;
        if (parent && parent.tagName === "MARK") return; // ✅ Prevent duplicate highlighting
        const match = node.nodeValue.match(regex);
        if (match) {
          const newNode = document.createElement("span");
          newNode.innerHTML = node.nodeValue.replace(
            regex,
            <mark class="highlight">$1</mark> // ✅ Wrap only matched part
          );
          node.replaceWith(newNode);
        }
      } else {
        node.childNodes.forEach(walk);
      }
    };

    document.querySelectorAll("p, h5, h6, span, li").forEach((node) => {
      walk(node);
    });
  };

  const removeHighlights = () => {
    document.querySelectorAll("mark.highlight").forEach((el) => {
      el.replaceWith(...el.childNodes);
    });
  };

  return <>{children}</>;
};

export default Highlighter;