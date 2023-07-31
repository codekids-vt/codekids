const toolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      'kind': 'category',
      'name': 'Math',
      'contents': [
        {
          'kind': 'block',
          'type': 'math_number'
        },
        {
          'kind': 'block',
          'type': 'math_arithmetic'
        },
        {
          'kind': 'block',
          'type': 'math_modulo'
        },
      ]
    },
    {
      'kind': 'category',
      'name': 'Variables',
      'custom': 'VARIABLE'
    },
    {
      'kind': 'category',
      'name': 'Control Flow',
      'contents': [
        {
          'kind': 'block',
          'type': 'controls_if'
        },
      ]
    },
    {
      'kind': 'category',
      'name': 'Logic',
      'contents': [
        {
          'kind': 'block',
          'type': 'logic_compare'
        },
        {
          'kind': 'block',
          'type': 'logic_operation'
        },
        {
          'kind': 'block',
          'type': 'logic_negate'
        },
        {
          'kind': 'block',
          'type': 'logic_boolean'
        },
        {
          'kind': 'block',
          'type': 'logic_ternary'
        },
      ]
    },
    {
      'kind': 'category',
      'name': 'Loops',
      'hidden': 'true',
      'contents': [

      ]
    },
    {
      'kind': 'category',
      'name': 'Lists',
      'hidden': 'true',
      'contents': [

      ]
    },
    {
      'kind': 'category',
      'name': 'Functions',
      'custom': 'PROCEDURE',
      'hidden': 'false'
    },
    {
      'kind': 'category',
      'name': 'Text',
      'contents': [
        {
          'kind': 'block',
          'type': 'text'
        },
      ]
    },
  ],
};

export default toolbox;
