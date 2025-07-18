import buildIntroductionNextjs from "./introduction-nextjs.js";
import buildSsrNextjs from "./server-components-nextjs.js";

export async function getCourses() {
  const introductionNextjs = await buildIntroductionNextjs();
  const ssrNextjs = await buildSsrNextjs();
  return [introductionNextjs, ssrNextjs];
}

export default getCourses;
