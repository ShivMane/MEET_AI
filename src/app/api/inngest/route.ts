import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { meetingsProcessing } from "../../../inngest/function";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    // helloWorld, // <-- This is where you'll always add all your functions
    meetingsProcessing,
  ],
});