import { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { EditorView } from '@codemirror/view';

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
  placeholder?: string;
  readOnly?: boolean;
}

const darkTheme = EditorView.theme({
  '&': {
    backgroundColor: '#18181b',
    height: '100%'
  },
  '.cm-content': {
    caretColor: '#22d3ee',
    fontFamily: "'JetBrains Mono', monospace",
    padding: '16px'
  },
  '.cm-cursor': {
    borderLeftColor: '#22d3ee'
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(39, 39, 42, 0.5)'
  },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: 'rgba(34, 211, 238, 0.2)'
  },
  '.cm-gutters': {
    backgroundColor: '#18181b',
    borderRight: '1px solid #27272a',
    color: '#52525b'
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#27272a'
  },
  '.cm-matchingBracket': {
    backgroundColor: 'rgba(34, 211, 238, 0.3)',
    outline: '1px solid #22d3ee'
  }
}, { dark: true });

export function SqlEditor({ value, onChange, onExecute, placeholder, readOnly = false }: SqlEditorProps) {
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      onExecute();
    }
  }, [onExecute]);

  return (
    <div className="h-full" onKeyDown={handleKeyDown}>
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={[sql(), darkTheme]}
        placeholder={placeholder || 'Skriv din SQL-fråga här...'}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          bracketMatching: true,
          autocompletion: true,
          foldGutter: false,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          closeBrackets: true
        }}
        className="h-full text-sm"
      />
    </div>
  );
}
