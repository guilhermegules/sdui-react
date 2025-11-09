import { z } from "zod";

export const nodeSchema = z.lazy(() =>
  z.object({
    type: z.string(),
    title: z.string().optional(),
    value: z.string().optional(),
    label: z.string().optional(),
    action: z.string().optional(),
    style: z.record(z.string(), z.string()).optional(),
    onClick: z.function().optional(),
    children: z
      .array(
        z.object({
          type: z.string(),
          title: z.string().optional(),
          value: z.string().optional(),
          label: z.string().optional(),
          action: z.string().optional(),
          style: z.record(z.string(), z.string()).optional(),
        })
      )
      .optional(),
  })
);

export type Node = z.infer<typeof nodeSchema>;
