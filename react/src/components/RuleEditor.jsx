// import React, { useEffect, useState } from 'react';
// import { Box, Button, CircularProgress, Paper, useTheme } from '@mui/material';
// import Editor from '@monaco-editor/react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { fetchFileContent, saveFileContent } from '../api/drools';
// import { toast } from 'react-toastify';
//
// export default function RuleEditor({ fileName }) {
//     const qc = useQueryClient();
//     const theme = useTheme();
//     const editorTheme = theme.palette.mode === 'dark' ? 'vs-dark' : 'light';
//
//     const {
//         data: content = '',
//         isLoading,
//     } = useQuery({
//         queryKey: ['file', fileName],
//         queryFn: () => fetchFileContent(fileName),
//         enabled: !!fileName,
//     });
//
//     const [value, setValue] = useState('');
//     const [dirty, setDirty] = useState(false);
//
//     useEffect(() => {
//         setValue(content);
//         setDirty(false);
//     }, [content]);
//
//     const mutation = useMutation({
//         mutationFn: newContent => saveFileContent(fileName, newContent),
//         onSuccess: () => {
//             toast.success('Saved successfully');
//             qc.invalidateQueries({ queryKey: ['file', fileName] });
//             setDirty(false);
//         },
//         onError: () => toast.error('Save failed'),
//     });
//
//     if (!fileName) {
//         return <Box p={2}>Select a file to edit</Box>;
//     }
//     if (isLoading) {
//         return <CircularProgress sx={{ m: 2 }} />;
//     }
//
//     return (
//         <Box sx={{ p: 2, mt: 8, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
//             <Paper
//                 elevation={3}
//                 sx={{
//                     borderRadius: 4,
//                     overflow: 'hidden',
//                     boxShadow: theme.shadows[4],
//                 }}
//             >
//                 <Box sx={{ backgroundColor: theme.palette.background.paper, px: 2, py: 1, borderBottom: `1px solid ${theme.palette.divider}` }}>
//                     <Box component="span" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
//                         Editing: {fileName}
//                     </Box>
//                 </Box>
//                 <Box sx={{ height: '70vh' }}>
//                     <Editor
//                         width="100%"
//                         height="100%"
//                         theme={editorTheme}
//                         language="java"
//                         value={value}
//                         onChange={v => {
//                             setValue(v);
//                             setDirty(true);
//                         }}
//                         options={{
//                             wordWrap: 'on',
//                             minimap: { enabled: false },
//                             fontSize: 14,
//                             fontFamily: 'Fira Code, Consolas, monospace',
//                             fontLigatures: true,
//                             lineNumbers: 'on',
//                             renderWhitespace: 'all',
//                             automaticLayout: true,
//                             scrollBeyondLastLine: false,
//                             roundedSelection: true,
//                             renderIndentGuides: true,
//                             folding: true,
//                             bracketPairColorization: { enabled: true },
//                         }}
//                     />
//                 </Box>
//             </Paper>
//             <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
//                 <Button
//                     variant="contained"
//                     onClick={() => mutation.mutate(value)}
//                     disabled={!dirty}
//                 >
//                     Save
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     onClick={() => { setValue(content); setDirty(false); }}
//                     disabled={!dirty}
//                 >
//                     Revert
//                 </Button>
//             </Box>
//         </Box>
//     );
// }

import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, useTheme } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { oneDark } from '@codemirror/theme-one-dark';       // dark theme
import { githubLight } from '@uiw/codemirror-theme-github'; // light theme
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFileContent, saveFileContent } from '../api/drools';
import { toast } from 'react-toastify';

export default function RuleEditor({ fileName }) {
    const qc = useQueryClient();
    const theme = useTheme();
    const cmTheme = theme.palette.mode === 'dark' ? oneDark : githubLight;

    const { data: content = '', isLoading } = useQuery({
        queryKey: ['file', fileName],
        queryFn: () => fetchFileContent(fileName),
        enabled: !!fileName,
    });

    const [value, setValue] = useState('');
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        setValue(content);
        setDirty(false);
    }, [content]);

    const mutation = useMutation({
        mutationFn: newContent => saveFileContent(fileName, newContent),
        onSuccess: () => {
            toast.success('Saved successfully');
            qc.invalidateQueries({ queryKey: ['file', fileName] });
            setDirty(false);
        },
        onError: () => toast.error('Save failed'),
    });

    if (!fileName) return <Box p={2}>Select a file to edit</Box>;
    if (isLoading) return <CircularProgress sx={{ m: 2 }} />;

    return (
        <Box sx={{ p: 2, mt: 8, minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        px: 2, py: 1,
                        borderBottom: `1px solid ${theme.palette.divider}`
                    }}
                >
                    <Box component="span" sx={{ fontWeight: 'bold' }}>
                        Editing: {fileName}
                    </Box>
                </Box>
                <Box sx={{ height: '70vh' }}>
                    <CodeMirror
                        value={value}
                        height="100%"
                        extensions={[java()]}
                        theme={cmTheme}
                        onChange={(val) => {
                            setValue(val);
                            setDirty(true);
                        }}
                        basicSetup={{
                            lineNumbers: true,
                            highlightActiveLine: true,
                            foldGutter: true,
                        }}
                    />
                </Box>
            </Paper>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={() => mutation.mutate(value)}
                    disabled={!dirty}
                >
                    Save
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => { setValue(content); setDirty(false); }}
                    disabled={!dirty}
                >
                    Revert
                </Button>
            </Box>
        </Box>
    );
}
