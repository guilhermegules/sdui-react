import { Suspense } from "react";
import { componentRegistry } from "./core/componentRegistry";
import type { Node } from "./core/schema";
import { useAction, type ActionHandler } from "./core/useAction";

type RendererProps = {
  json: Node;
  handlers?: Record<string, ActionHandler>;
};

export const Renderer = ({ json, handlers }: RendererProps) => {
  const action = useAction({ handlers });

  if (!json) return null;

  const Component = componentRegistry[json.type];

  if (!Component) return <p>Unknown component: {json.type}</p>;

  if (json.title && json.type === "Screen") {
    document.title = json.title;
  }

  const props = { ...json };
  console.log(json.action);
  if (json.action === "change") {
    props.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      action(`change:${value}`);
    };
  } else {
    props.onClick = () => {
      action(json.action);
    };
  }

  const children = json.children?.map((child, idx) => (
    <Renderer key={idx} json={child} handlers={handlers} />
  ));

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props}>{children}</Component>
    </Suspense>
  );
};
