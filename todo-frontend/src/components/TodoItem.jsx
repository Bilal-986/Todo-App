import { useState } from 'react';
import { Edit3, Trash2, Check, X, Calendar, Clock } from 'lucide-react';
import { todoAPI } from '../services/api';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    due_time: todo.due_time ? todo.due_time.slice(0, 16) : ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await todoAPI.toggleTodo(todo.id);
      onUpdate(response.data);
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editData.title.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await todoAPI.updateTodo(todo.id, editData);
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: todo.title,
      description: todo.description,
      due_time: todo.due_time ? todo.due_time.slice(0, 16) : ''
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    
    setIsLoading(true);
    try {
      await todoAPI.deleteTodo(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="input-field font-medium"
            placeholder="Todo title"
          />
          
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="input-field resize-none"
            rows="2"
            placeholder="Description (optional)"
          />
          
          <input
            type="datetime-local"
            value={editData.due_time}
            onChange={(e) => setEditData({ ...editData, due_time: e.target.value })}
            className="input-field"
          />
          
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
              disabled={isLoading || !editData.title.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm transition-all duration-200 ${
      todo.completed ? 'opacity-75' : 'hover:shadow-md'
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
            todo.completed
              ? 'bg-primary-600 border-primary-600 dark:bg-primary-500 dark:border-primary-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400'
          }`}
        >
          {todo.completed && (
            <Check className="w-3 h-3 text-white mx-auto" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-gray-900 dark:text-gray-100 ${
            todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
          }`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className={`mt-1 text-sm text-gray-600 dark:text-gray-400 ${
              todo.completed ? 'line-through' : ''
            }`}>
              {todo.description}
            </p>
          )}
          
          {todo.due_time && (
            <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formatDate(todo.due_time)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            title="Edit todo"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="p-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            title="Delete todo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 