#!/usr/bin/env node

/**
 * Generates a markdown API reference page from the Dale.Sdk XML documentation file.
 *
 * This avoids reflection-based tools (xmldoc2md, DefaultDocumentation) which fail
 * because the Dale.Sdk DLL depends on Metalama at load time.
 *
 * Usage: node scripts/generate-sdk-api-reference.js
 *
 * Prerequisites: Build the SDK first with `dotnet build Dale.Sdk -c Release`
 */

const fs = require('fs');
const path = require('path');

// Paths
const XML_PATH = path.resolve(__dirname, '../../dale/Dale.Sdk/bin/Release/netstandard2.1/Dale.Sdk.xml');
const OUTPUT_PATH = path.resolve(__dirname, '../docs/api-reference/index.md');

// Only document these namespaces (user-facing API)
const INCLUDE_NAMESPACES = [
  'Dale.Sdk.Core',
  'Dale.Sdk.Configuration',
  'Dale.Sdk.Configuration.Interfaces',
  'Dale.Sdk.Configuration.Services',
  'Dale.Sdk.Utils',
];

// Parse XML docs (simple regex-based, no dependency needed)
function parseXmlDocs(xmlContent) {
  const members = [];
  const memberRegex = /<member name="([^"]+)">\s*([\s\S]*?)\s*<\/member>/g;
  let match;

  while ((match = memberRegex.exec(xmlContent)) !== null) {
    const fullName = match[1];
    const body = match[2];

    const prefix = fullName[0];
    const name = fullName.substring(2);

    const summaryMatch = body.match(/<summary>\s*([\s\S]*?)\s*<\/summary>/);
    const summary = summaryMatch
      ? summaryMatch[1].replace(/\s+/g, ' ').replace(/<see cref="[^:]*:([^"]*)"\/>/g, '`$1`').trim()
      : '';

    const remarksMatch = body.match(/<remarks>\s*([\s\S]*?)\s*<\/remarks>/);
    const remarks = remarksMatch
      ? remarksMatch[1].replace(/\s+/g, ' ').replace(/<see cref="[^:]*:([^"]*)"\/>/g, '`$1`').trim()
      : '';

    members.push({ prefix, name, summary, remarks, body });
  }

  return members;
}

function getNamespace(name) {
  const lastDot = name.lastIndexOf('.');
  return lastDot > 0 ? name.substring(0, lastDot) : '';
}

function getShortName(name) {
  const lastDot = name.lastIndexOf('.');
  return lastDot > 0 ? name.substring(lastDot + 1) : name;
}

function categorizeType(name) {
  if (name.endsWith('Attribute')) return 'Attributes';
  if (name.startsWith('I') && name.length > 1 && name[1] === name[1].toUpperCase()) return 'Interfaces';
  return 'Classes & Enums';
}

function generate() {
  if (!fs.existsSync(XML_PATH)) {
    console.error('XML file not found: ' + XML_PATH);
    console.error('Build the SDK first: cd dale && dotnet build Dale.Sdk -c Release');
    process.exit(1);
  }

  const xml = fs.readFileSync(XML_PATH, 'utf8');
  const members = parseXmlDocs(xml);

  // Filter to included namespaces, types only
  const types = members.filter(function(m) {
    if (m.prefix !== 'T') return false;
    const ns = getNamespace(m.name);
    return INCLUDE_NAMESPACES.some(function(inc) {
      return ns === inc || ns.startsWith(inc + '.');
    });
  });

  // Group by category
  const grouped = {};
  for (const type of types) {
    const category = categorizeType(getShortName(type.name));
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(type);
  }

  // Find members for each type
  const typeMembers = {};
  for (const type of types) {
    typeMembers[type.name] = members.filter(function(m) {
      return m.prefix !== 'T' && m.name.startsWith(type.name + '.') &&
        !m.name.includes('#ctor');
    });
  }

  // Generate markdown
  const lines = [];
  lines.push('---');
  lines.push('title: SDK API Reference');
  lines.push('description: API reference for the Dale SDK public types.');
  lines.push('---');
  lines.push('');
  lines.push('# SDK API Reference');
  lines.push('');
  lines.push('::: info Auto-Generated');
  lines.push('This reference is generated from XML documentation comments in the Dale SDK source code.');
  lines.push('Last generated: ' + new Date().toISOString().split('T')[0]);
  lines.push(':::');
  lines.push('');

  const order = ['Attributes', 'Interfaces', 'Classes & Enums'];

  for (const category of order) {
    const items = grouped[category];
    if (!items || items.length === 0) continue;

    lines.push('## ' + category);
    lines.push('');

    items.sort(function(a, b) {
      return getShortName(a.name).localeCompare(getShortName(b.name));
    });

    lines.push('| Type | Description |');
    lines.push('|------|-------------|');

    for (const item of items) {
      const shortName = getShortName(item.name);
      const summary = item.summary || '\u2014';
      lines.push('| `' + shortName + '` | ' + summary + ' |');
    }

    lines.push('');
  }

  // Detailed sections for key types
  lines.push('## Key Type Details');
  lines.push('');

  const keyTypeNames = [
    'LogicBlockBase',
    'ServicePropertyAttribute',
    'ServiceMeasuringPointAttribute',
    'TimerAttribute',
    'PersistentAttribute',
    'ServiceProviderContractAttribute',
    'ContractAttribute',
    'CommandAttribute',
    'RequestResponseAttribute',
    'StateUpdateAttribute',
    'CategoryAttribute',
    'ImportanceAttribute',
    'DisplayAttribute',
    'InterfaceAttribute',
    'LogicBlockInfoAttribute',
    'IConfigureServices',
  ];

  const keyTypes = types.filter(function(t) {
    return keyTypeNames.includes(getShortName(t.name));
  });

  for (const type of keyTypes) {
    const short = getShortName(type.name);
    lines.push('### `' + short + '`');
    lines.push('');

    if (type.summary) {
      lines.push(type.summary);
      lines.push('');
    }
    if (type.remarks) {
      lines.push(type.remarks);
      lines.push('');
    }

    const mems = typeMembers[type.name];
    if (mems && mems.length > 0) {
      const props = mems.filter(function(m) { return m.prefix === 'P'; });
      const methods = mems.filter(function(m) { return m.prefix === 'M'; });

      if (props.length > 0) {
        lines.push('**Properties:**');
        lines.push('');
        lines.push('| Property | Description |');
        lines.push('|----------|-------------|');
        for (const p of props) {
          lines.push('| `' + getShortName(p.name) + '` | ' + (p.summary || '\u2014') + ' |');
        }
        lines.push('');
      }

      if (methods.length > 0) {
        lines.push('**Methods:**');
        lines.push('');
        lines.push('| Method | Description |');
        lines.push('|--------|-------------|');
        for (const m of methods) {
          let methodName = m.name.substring(type.name.length + 1);
          methodName = methodName.replace(/\(.*\)/, '(...)');
          lines.push('| `' + methodName + '` | ' + (m.summary || '\u2014') + ' |');
        }
        lines.push('');
      }
    }
  }

  lines.push('## Related Documentation');
  lines.push('');
  lines.push('- [Logic Blocks](/sdk/logic-blocks) \u2014 lifecycle, attributes, thread safety');
  lines.push('- [Properties & Measuring Points](/sdk/properties) \u2014 property types, categories, display hints');
  lines.push('- [Service Provider Contracts](/sdk/services) \u2014 I/O bindings, Modbus RTU');
  lines.push('- [Logic Interfaces](/sdk/logic-interfaces) \u2014 contracts, commands, request/response');
  lines.push('- [Testing](/sdk/testing) \u2014 TestKit API reference');
  lines.push('');

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, lines.join('\n'));
  console.log('Generated: ' + OUTPUT_PATH + ' (' + types.length + ' types documented)');
}

generate();
