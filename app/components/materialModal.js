"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";

export function MaterialModal({ isOpen, onClose, onSubmit, title }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "text",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      type: Yup.string().oneOf(["text", "pdf", "video"], "Invalid type"),
      content: Yup.string().required("Content is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm(); // Reset form values to empty
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center text-gray-900">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={() => {
              formik.resetForm(); // Reset form when closing
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              required
            />
            {formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Type Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              <option value="text">Text</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
            </select>
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            {formik.values.type === "text" ? (
              <textarea
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px] resize-y"
                required
              />
            ) : (
              <input
                type="url"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder={
                  formik.values.type === "pdf" ? "PDF URL" : "YouTube Embed URL"
                }
                required
              />
            )}
            {formik.errors.content && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.content}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => {
                formik.resetForm(); // Reset form when closing
                onClose();
              }}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
