import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export default function EditableText({ value, onChange, className, multiline = false, renderAsList = false, elementType = 'span' }) {
  const { isAdmin } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Move cursor to end
      if (inputRef.current.setSelectionRange) {
        inputRef.current.setSelectionRange(localValue.length, localValue.length);
      }
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setLocalValue(value);
    }
  };

  if (!isAdmin) {
    if (renderAsList) {
      return (
        <ul className={`${className} list-disc pl-5 space-y-2`}>
          {value.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line.trim().replace(/^[•\-\*]\s*/, '')}</li>)}
        </ul>
      );
    }
    const Tag = elementType;
    return <Tag className={className}>{value}</Tag>;
  }

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`w-full bg-slate-100 dark:bg-stone-800 text-slate-900 dark:text-stone-100 p-2 rounded border border-blue-400 focus:outline-none ${className}`}
          rows={3}
        />
      );
    }
    
    return (
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`bg-slate-100 dark:bg-stone-800 text-slate-900 dark:text-stone-100 px-2 py-1 flex-1 rounded border border-blue-400 focus:outline-none ${className}`}
      />
    );
  }

  if (renderAsList) {
    return (
      <ul 
        className={`relative group cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500 hover:outline-offset-2 rounded transition-all list-disc pl-5 space-y-2 ${className}`}
        onClick={() => setIsEditing(true)}
        title="Click to edit as text"
      >
        {value.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line.trim().replace(/^[•\-\*]\s*/, '')}</li>)}
      </ul>
    );
  }

  const Tag = elementType;
  return (
    <Tag 
      className={`relative group cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500 hover:outline-offset-2 rounded transition-all ${className}`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {value}
    </Tag>
  );
}
