import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { todoAPI } from '../services/api';

const AddTodo = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_time: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      const response = await todoAPI.createTodo(formData);
      onAdd(response.data);
      setFormData({ title: '', description: '', due_time: '' });
      setIsExpanded(false);
    } catch (error) {
      console.error('Error creating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', due_time: '' });
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
      >
        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add new todo</span>
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Add New Todo</h3>
          <button
            type="button"
            onClick={handleCancel}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="Enter todo title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field resize-none"
            rows="3"
            placeholder="Enter todo description (optional)"
          />
        </div>

        <div>
          <label htmlFor="due_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date & Time
          </label>
          <input
            type="datetime-local"
            id="due_time"
            value={formData.due_time}
            onChange={(e) => setFormData({ ...formData, due_time: e.target.value })}
            className="input-field"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !formData.title.trim()}
          >
            {isLoading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo; 