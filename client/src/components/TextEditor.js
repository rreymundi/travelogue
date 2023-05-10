import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ formData, setFormData }) => {
  const editorRef = useRef(null);
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  // const [contentEditor, setContentEditor] = useState('');
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    setFormData({ ...formData, description: content });
  }

  return (
    <>
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        apiKey='wlkgvk93wd8s5889aero1pvl6ktjmvei4cqqgjbbtuca1ogw'
        init={{
          height: 500,
          menubar: true,
          plugins: 'advlist autolink lists link image charmap preview anchor ' +
            'searchreplace visualblocks code fullscreen ' +
            'insertdatetime media table code help wordcount'
          ,
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        value={formData.description}
        onEditorChange={handleEditorChange}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}

export default TextEditor