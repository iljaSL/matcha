import tagModel from '../models/tagModel.js';

const getTags = async (request, response, err) => {
  const tags = await tagModel.getTags();
  return response.status(200).json(tags);
};

const addTag = async (request, response, err) => {
  const { tag } = request.body;
  if (await tagModel.isDuplicate(tag)) return response.status(409).json({ error: 'Duplicate' });
  const result = await tagModel.addTag(tag);
  if (result) return response.status(201).json({ message: 'Tag added' });
};

export default {
  getTags, addTag,
};
