import tagModel from '../models/tagModel.js';

const getTags = async (request, response, next) => {
  const tags = await tagModel.getTags();
  return response.status(200).json(tags);
};

const getTagById = async (request, response, next) => {
  const tag = await tagModel.getTagById(request.params.id);
  if (tag) return response.status(200).json(tag);
  return response.status(400).json({ message: 'no such tag' });
};

const addTag = async (request, response, next) => {
  const { tag } = request.body;
  if (await tagModel.isDuplicate(tag)) return response.status(409).json({ error: 'Duplicate' });
  const result = await tagModel.addTag(tag);
  if (result) return response.status(201).json({ status: 'success', id: result });
};

const getTagUsers = async (request, response, next) => {
  const tags = await tagModel.getTagUsers(request.params.id);
  return response.status(200).json(tags);
};

export default {
  getTags, addTag, getTagById, getTagUsers,
};
