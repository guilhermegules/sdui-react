import { Suspense } from "react";
import { componentRegistry } from "./core/componentRegistry";
import type { Node } from "./core/schema";
import { useAction } from "./core/useAction";

type RendererProps = {
  json: Node;
};

export const Renderer = ({ json }: RendererProps) => {
  const action = useAction();

  if (!json) return null;

  const Component = componentRegistry[json.type];

  if (!Component) return <p>Unknown component: {json.type}</p>;

  if (json.title && json.type === "Screen") {
    document.title = json.title;
  }

  const props = { ...json };
  if (json.action) {
    props.onClick = () => {
      action(json.action);
    };
  }

  const children = json.children?.map((child, idx) => (
    <Renderer key={idx} json={child} />
  ));

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};
