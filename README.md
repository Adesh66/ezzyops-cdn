# EzzyOps CDN

A content delivery network (CDN) repository for EzzyOps static assets, icons, and resources.

## Usage

You can access files from this CDN using jsDelivr:

```
https://cdn.jsdelivr.net/gh/Adesh66/ezzyops-cdn@latest/path/to/file
```

### Examples

**Logo Assets:**
```html
<!-- EzzyOps Logo -->
<img src="https://cdn.jsdelivr.net/gh/Adesh66/ezzyops-cdn@latest/assets/ezzyops-logo.png" alt="EzzyOps Logo">

<!-- EzzyOps Image -->
<img src="https://cdn.jsdelivr.net/gh/Adesh66/ezzyops-cdn@latest/assets/ezzyops.png" alt="EzzyOps">
```

**Icons:**
```html
<!-- Verified Icon -->
<img src="https://cdn.jsdelivr.net/gh/Adesh66/ezzyops-cdn@latest/icons/verified.gif" alt="Verified">
```

### Version Pinning

For production use, it's recommended to pin to a specific version:

```
https://cdn.jsdelivr.net/gh/Adesh66/ezzyops-cdn@1.0.0/assets/ezzyops-logo.png
```

## Directory Structure

```
├── assets/          # Main assets and logos
├── icons/           # Icon files
├── json/            # JSON data files
└── scripts/         # JavaScript files
```

## Contributing

1. Add your files to the appropriate directory
2. Update the version in package.json
3. Create a new release/tag
4. Files will be available via jsDelivr CDN

## License

MIT License - see package.json for details.
