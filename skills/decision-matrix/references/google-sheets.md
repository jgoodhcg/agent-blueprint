# Google Sheets Decision Matrix

## Canonical grid

Use the `matrix-reloaded` XLSX layout exactly:

| Cell range | Content |
|---|---|
| A1 | Decision statement or question |
| B1, C1, ... | Option labels |
| A2 | Expanded decision description and constraints |
| B2, C2, ... | Option descriptions |
| A3, A4, ... | Criterion names, with weights in the labels when used |
| B3 onward | Assessments aligned by option and criterion |

Do not add a title row. Do not add `Criterion`, `Weight`, or `Option` header rows. Do not merge cells. Freeze row 1 and column A.

## Styling

Translate these XLSX values to Google Sheets RGB colors:

| Element | Hex | Google Sheets use |
|---|---|---|
| Decision cell A1 | `#2C3E50` | White bold text |
| Option headings | `#34495E` | White bold centered text |
| Decision description A2 | `#ECF0F1` | Italic dark-gray text |
| Option descriptions | `#F8F9FA` | Dark-gray text |
| Criterion names | `#F8F9FA` | Bold text |
| Benefit | `#CCFFCC` | Sparse semantic fill |
| Concern | `#FFFFCC` | Sparse semantic fill |
| Blocker | `#FFCCCC` | Sparse semantic fill |
| Borders | `#E0E0E0` | Thin borders on every populated cell |

Use Arial 10, wrapped text, and top vertical alignment. Use approximately 175 pixels for column A and 245 pixels for every option column. Auto-resize populated rows after writing.

## Filled example

| Which database should power the local-first app? | PostgreSQL | SQLite |
|---|---|---|
| Choose a durable store that supports offline development, simple operations, and a credible production path. | Network database with mature concurrency and operations. | Embedded database stored in one portable file. |
| Operational simplicity — 35% | Requires a service and connection management. | One file and no server process. `[green]` |
| Concurrent writes — 30% | Strong multi-writer concurrency. `[green]` | Write contention can become limiting. `[yellow]` |
| Portability — 20% | Standard ecosystem and broad hosting support. | Database is directly copyable. `[green]` |
| Hard gate | Pass. | Blocker if sustained multi-writer load is required. `[red]` |

The bracketed color names describe formatting; do not include them in cell text.

## `gws` mechanics

Read any workspace-specific Google Workspace reference before invoking `gws`. Use its credential and project configuration. Do not print credential contents or access tokens.

Inspect the target:

```sh
gws sheets spreadsheets get \
  --params '{"spreadsheetId":"SPREADSHEET_ID","includeGridData":false}'
```

Write the complete rectangular grid in one request:

```sh
gws sheets spreadsheets values update \
  --params '{"spreadsheetId":"SPREADSHEET_ID","range":"Decision Matrix!A1:C6","valueInputOption":"USER_ENTERED"}' \
  --json '{"range":"Decision Matrix!A1:C6","majorDimension":"ROWS","values":[["Decision","Option A","Option B"],["Description","A description","B description"],["Criterion","Assessment A","Assessment B"]]}'
```

Apply formatting atomically:

```sh
gws sheets spreadsheets batchUpdate \
  --params '{"spreadsheetId":"SPREADSHEET_ID"}' \
  --json '{"requests":[...]}'
```

Use `repeatCell` for fills, fonts, wrapping, and alignment; `updateBorders` for borders; `updateDimensionProperties` for column widths; `autoResizeDimensions` for row heights; and `updateSheetProperties` for frozen rows and columns.

Verify values after formatting:

```sh
gws sheets spreadsheets values get \
  --params '{"spreadsheetId":"SPREADSHEET_ID","range":"Decision Matrix!A1:C6"}'
```

If a `gws` request fails, inspect the relevant schema with `gws schema sheets.spreadsheets.values.update` or `gws schema sheets.spreadsheets.batchUpdate`. Batch updates are atomic: fix a rejected request and retry the complete formatting transaction.
