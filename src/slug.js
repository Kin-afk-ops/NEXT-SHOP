import slugify from "slugify";
const configSlug = (text) => {
  const slug = slugify(text, {
    lower: true,
    locale: "vi",
    remove: /[*+~.()'"!:@,?]/g,
  });
  return slug;
};

export default configSlug;
