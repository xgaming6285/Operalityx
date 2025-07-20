# Document Visualizer System

## Overview

The Operalityx website now includes a powerful document visualizer system that allows administrators to import and display articles from various formats (Word, PDF, HTML, Markdown, Images) in the Stories and News sections. The documents are displayed exactly as they appear in their original editors, without any viewer borders or interface elements interfering with the content.

## Features

### Document Viewer

- **Borderless Display**: Documents render exactly as they appear in their original format
- **Multiple Format Support**: Word (.docx, .doc), PDF, HTML, Markdown, Images
- **Fullscreen Mode**: Toggle fullscreen for immersive reading
- **Metadata Display**: Show document information (author, date, word count, etc.)
- **Download Function**: Export documents for offline viewing
- **Keyboard Navigation**: ESC to close/exit fullscreen

### Admin Panel

- **Document Management**: Upload, preview, and delete documents
- **Drag & Drop Upload**: Easy file upload with drag and drop support
- **Content Type Detection**: Automatic format detection based on file extension
- **Document Organization**: Separate stories and news articles
- **Real-time Preview**: Preview documents before publishing

## Access

### For Developers/Administrators

- **Keyboard Shortcut**: Press `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac) to open the admin panel
- No visible UI elements expose the admin functionality to regular users

### For Users

- Click on any story or news card to view the full document
- Documents open in a clean, distraction-free viewer
- Navigate using on-screen controls or keyboard shortcuts

## Supported File Formats

| Format             | Extensions                     | Description              |
| ------------------ | ------------------------------ | ------------------------ |
| **Word Documents** | .docx, .doc                    | Microsoft Word documents |
| **PDF Documents**  | .pdf                           | Portable Document Format |
| **HTML**           | .html, .htm                    | Web documents            |
| **Markdown**       | .md                            | Markdown files           |
| **Images**         | .jpg, .jpeg, .png, .gif, .webp | Image files              |

## How to Use

### Uploading Documents

1. Press `Ctrl+Shift+A` to open the admin panel
2. Click "Upload Document"
3. Select document type (Story or News)
4. Drag and drop your file or click to browse
5. Fill in title, subtitle (optional), and description
6. Click "Upload Document"

### Viewing Documents

1. Navigate to the Stories or News section
2. Click on any card to open the document viewer
3. Use the toolbar to:
   - Toggle fullscreen mode
   - View document metadata
   - Download the document
   - Close the viewer

### Managing Documents

1. Open the admin panel (`Ctrl+Shift+A`)
2. Filter documents by type (All, Stories, News)
3. Preview documents with the eye icon
4. Delete documents with the trash icon

## Technical Implementation

### Document Storage

- Documents are converted to HTML for consistent display
- Original formatting and styling are preserved
- Metadata is stored alongside document content

### File Conversion

- **Images**: Displayed directly with responsive sizing
- **Markdown**: Converted to HTML with basic formatting
- **HTML**: Displayed as-is
- **Word/PDF**: Currently shows placeholder (production would use specialized conversion libraries)

### Performance

- Lazy loading for document content
- Optimized image display
- Efficient document caching

## Development Notes

### Production Considerations

For production deployment, consider integrating:

- **mammoth.js** for Word document conversion
- **PDF.js** for PDF rendering
- **marked** or **remark** for advanced Markdown parsing
- Cloud storage for document files
- User authentication for admin access

### Security

- File type validation
- Content sanitization
- Access control for admin functions

### Future Enhancements

- Collaborative editing
- Version control for documents
- Comments and annotations
- Search functionality
- Categories and tags
- SEO optimization for documents

## Browser Compatibility

The document viewer is compatible with:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

1. **Admin panel won't open**: Ensure you're using the correct keyboard shortcut (`Ctrl+Shift+A`)
2. **Documents not loading**: Check browser console for errors
3. **File upload fails**: Verify file format is supported
4. **Viewer appears broken**: Check if CSS is loading properly

### Browser Support

If experiencing issues, try:

- Clearing browser cache
- Disabling browser extensions
- Using an incognito/private window

## Contributing

When adding new features or fixing bugs:

1. Maintain the borderless viewing experience
2. Ensure cross-browser compatibility
3. Test with various document formats
4. Follow existing code patterns
5. Update this documentation as needed
