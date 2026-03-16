function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function addSlug(schema, fieldName = "collectionName") {
  schema.pre("save", function (next) {
    if (this.isModified(fieldName)) {
      this.slug = slugify(this[fieldName]);
    }
    next();
  });

  schema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();

    if (update?.[fieldName]) {
      update.slug = slugify(update[fieldName]);
      this.setUpdate(update);
    }

    next();
  });
}

module.exports = addSlug;
