# Three-Letter Name (`tln`)

**The npm package registry is running out of three-letter names!** The shortage has created a competitive environment for aspiring JavaScript library and framework creators. Today might be your last chance to claim your three-letter package name for your new incredible library/framework, but fear not - `tln` is here for you.

To generate your very own (still) available three-letter npm package name, simply run:

```console
$ npx tln
fgu
```

It might take a second to find the perfect three-letter name for you, as most of them are already taken. But there, **fgu** is the _exciting_ name of your new _intriguing_ component library!

You can also generate multiple names at a time:

```console
$ npx tln -n 6
jco
blw
fko
zcf
yzn
wnn
```

> Pass the `-u` flag to only get unique letters in names.

Or you can check the availability of any npm package name:

```console
$ npx tln -c 'tln'
Name tln is taken:
https://npmjs.com/package/tln
```

For all possible options, run `tln` with the `-h` flag:

```console
$ npx tln -h
tln - Generate available three-letter npm package names.

usage: tln
       tln [-n|--count] <count>
       tln [-c|--check] <name>
       tln [-h|--help]

options:
    -n, --count [COUNT]     The number of names to generate.
    -c, --check [NAME]      Check if NAME is an available package name on npm.
    -u, --unique-letters    Only generate names with unique letters.
    -h, --help              Show this message.
```

## API Reference

For advanced usage, `tln` may be installed as a library using:

```console
$ npm i tln
```

You may then use it inside ES Modules like so:

```js
import { availableNames } from 'tln';
// ...
const myNames = await availableNames(3);
// ...
```

Or inside CommonJS modules:

```js
const tln = require('tln');
// ...
const myNames = await tln.availableNames(3);
// ...
```

### Functions

#### `availableNames(count, options?)`

Generate unique available names.

- `count`: the `number` of names to be generated
- `options.uniqueLetters`: a `boolean`, if `true`, only generate names, only containing unique letters

Returns a `Promise<string[]>` of size `count`, containing the generated names.

#### `isNameAvailable(name)`

Check if `name` is available on the npm package registry.

- `name`: a `string`, the name to check

Returns a `Promise<boolean>`, which is `true` if `name` is available on the npm registry and `false` if it is registered.

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
