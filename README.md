Nugo Responsive Table
===================
This repository contains the nugo-responsive-table package.

![API Version](https://img.shields.io/badge/version-1.1.16-brightgreen.svg)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Instalation

Using yarn:
```shell
$ yarn add nugo-responsive-table
```

Using npm:
```shell
$ npm i nugo-responsive-table
```

## Usage
```js
// Import
import ResponsiveTable from 'nugo-responsive-table'
```

```js
// Columns configuration
const columns = [
  {
    title: [String] The column title,
    alwaysVisible: [Boolean] If true, the column are visile on mobile version. If false, the column will show only for computer and tablet versions,
    dataIndex: [String] The column index,
    align: [String] The column align. [left|right|center],
    sorter: [Func] Change the default sorter function,
    render: [Func] Change the default render function
  }
]

// Using
<ResponsiveTable
  columns=[Array] The array with columns configuration
  data=[array] The data
  title=[String] The table title
  searchKey=[String] The name of the column used in filter field.
  searchPlaceholder=[String] the placeholder used in filter field.
  pageSize=[Number] The page size used in pagination
/>

//Example
const columns = [
  {
    title: 'TICKET MÉD.',
    alwaysVisible: true,
    dataIndex: 'averageTicket',
    align: 'right',
    sorter: (a, b) => a.averageTicket - b.averageTicket,
    render: value => (
      <Fragment>
        <span className="dollar">R$ </span>
        <span>{formatNumber(value)}</span>
      </Fragment>
    )
  }
]
<ResponsiveTable
  columns={columns}
  data={data}
  title='Seus clientes'
  searchKey="name"
  searchPlaceholder='Procure por um nome'
  pageSize={20}
/>
```


## Publishing (Development)

Follow these steps to publish the package:
1. Make the code changes;
2. Change the version package in package.json (https://semver.org/);
3. run the follow command: ```npm publish```


## Available Scripts (Development)

In the project directory, you can run:

### `yarn clean`

Remove all files from dist folder.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
