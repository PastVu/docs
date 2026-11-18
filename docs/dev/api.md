---
title: API
description: Documentation on API methods
tags:
  - Development
  - API
sidebar_position: 3
---

# PastVu API

:::warning Deprecated
The API endpoint `https://pastvu.com/api2` has been deprecated in favor of `https://api.pastvu.com/api2`. Please update your integrations to use the new endpoint.
:::

:::info
To retrieve a photo, you need to add the contents of the `file` field from the API method response to the URL:
* `https://img.pastvu.com/d/` for standard size;
* `https://img.pastvu.com/a/` for original size;
* `https://img.pastvu.com/h/` for thumbnail size.
:::

:::warning Deprecated
* `https://pastvu.com/_p/d/` for standard size;
* `https://pastvu.com/_p/a/` for original size;
* `https://pastvu.com/_p/h/` for thumbnail size.
:::

The following methods are supported:

### photo.giveForPage

Returns the data needed to display a photo page by its `cid`.

Parameter | Mandatory | Type | Description |
--- | --- | --- | --- |
cid | ✓ | int | unique photo number |

**Query example:**

`https://api.pastvu.com/api2?method=photo.giveForPage&params={"cid":2131190}`

**Response example (shortened):**

```json
{
  "result": {
    "photo": {
      "cid": 2131190,
      "file": "path/to/photo.jpg",
      "title": "Надвоицкий водопад",
      "y": "1925—1926",
      "year": 1925,
      "year2": 1926
    },
    "can": {},
    "forEdit": false
  },
  "rid": "..."
}
```

The example does not include every field of the `photo` object. Depending on the photo and the current user, it may also contain location, author, and region data.

Field | Type | Description |
--- | --- | --- |
`result.photo.cid` | int | photo identifier |
`result.photo.type` | int | object type: `1` for photo, `2` for painting |
`result.photo.file` | string | relative path to the image file; prepend one of the image URLs listed above |
`result.photo.title` | string | photo title |
`result.photo.y` | string | displayed photo date |
`result.photo.year`, `result.photo.year2` | int | first and last year of the object date range |
`result.can` | object | actions available to the current user |
`result.forEdit` | bool | whether editing data is included in the response |
`rid` | string | request identifier used for diagnostics |

**Errors:**

Code | When returned |
--- | --- |
`BAD_PARAMS` | `cid` is missing, is not a number, or is less than 1 |
`NO_SUCH_PHOTO` | the photo does not exist or is not available to the current user |

API errors are returned as JSON with a top-level `code` field and HTTP status `200 OK`. Check `code` rather than relying on the HTTP status alone.

### comment.giveForObj

Returns comment tree by photo number.

Parameter | Mandatory | Type | Description |
--- | --- | --- | --- |
cid | ✓ | int | unique photo number |

**Query example:**

`https://api.pastvu.com/api2?method=comment.giveForObj&params={"cid":23314}`

### photo.giveNearestPhotos

Returns public photos or paintings nearest to the specified point. Results are sorted from nearest to farthest, but the distance itself is not included in the response.

Parameter | Mandatory | Type | Default | Description |
--- | --- | --- | --- | --- |
geo | ✓ | array [lat, lon] | | search point as latitude and longitude |
except | | int | | `cid` of an object to exclude from the results |
distance | | int | 10000 | search radius in meters, from 1 to 1000000 |
year | | int | | lower bound for the `year` field |
year2 | | int | | upper bound for the `year` field |
type | | int | 1 | object type: `1` for photo, `2` for painting |
limit | | int | 30 | number of results, from 1 to 30 |
skip | | int | 0 | number of results to skip, from 0 to 999 |

**Query example:**

`https://api.pastvu.com/api2?method=photo.giveNearestPhotos&params={"geo":[37.82,-122.469322],"limit":12,"except":228481}`

**Response example (shortened):**

```json
{
  "result": {
    "photos": [
      {
        "s": 5,
        "cid": 449459,
        "file": "path/to/photo.jpg",
        "title": "View of the Marin Tower of the Golden Gate Bridge under construction",
        "dir": "nw",
        "geo": [37.82287, -122.474985],
        "year": 1934
      }
    ]
  },
  "rid": "..."
}
```

The example does not include every field that may be present in a returned object.

Field | Type | Description |
--- | --- | --- |
`result.photos` | array | objects sorted from nearest to farthest |
`result.photos[].s` | int | publication status; the method returns objects with status `5` |
`result.photos[].cid` | int | object identifier |
`result.photos[].file` | string | relative path to the image file; prepend one of the image URLs listed above |
`result.photos[].title` | string | object title |
`result.photos[].dir` | string | shooting direction code |
`result.photos[].geo` | array [lat, lon] | object coordinates |
`result.photos[].year` | int | first year of the object date range |
`rid` | string | request identifier used for diagnostics |

**Errors:**

Code | When returned |
--- | --- |
`BAD_PARAMS` | `geo` is missing or is not a valid latitude and longitude pair |

API errors are returned as JSON with a top-level `code` field and HTTP status `200 OK`. Check `code` rather than relying on the HTTP status alone.

### photo.getByBounds

Returns public photos or paintings inside a GeoJSON `Polygon` or `MultiPolygon`. The response depends on `localWork`:

`localWork` | Mode | Response |
--- | --- | --- |
`false` | server-side clustering | single objects in `photos` and groups of objects in `clusters` |
`true` | direct object lookup | all matching objects in `photos`; `clusters` is omitted |

`localWork` is not selected automatically from `z` when `geometry` is used. Set it explicitly. The PastVu map uses server-side clustering through zoom level 16 and direct lookup from zoom level 17.

GeoJSON positions use `[lon, lat]`. Close each polygon ring by repeating its first position at the end. The exterior ring must follow a counterclockwise path; see [RFC 7946, section 3.1.6](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.6).

Parameter | Mandatory | Type | Default | Description |
--- | --- | --- | --- | --- |
geometry | ✓ | GeoJSON `Polygon` or `MultiPolygon` | | search area |
z | ✓ | int | | zoom level, starting with `1`; selects the server cluster grid in cluster mode and is echoed in the response |
isPainting | | bool | `false` | search paintings instead of photos |
year | | int | | first year of the date range; use together with `year2` |
year2 | | int | | last year of the date range; use together with `year` |
localWork | | bool | `false` | use direct object lookup instead of server-side clusters |
startAt | | int | | client request marker echoed unchanged in the response |

The year filter is applied only when both values are numbers, `year` is not greater than `year2`, and both values are within the supported range: 1826–2000 for photos or -100–1980 for paintings. The selected interval must be shorter than the complete supported range. Otherwise, the year filter is ignored.

#### Server-side clustering

Use `localWork: false` to receive precomputed clusters for the requested `z`. A cluster cell containing one object is returned in `photos`; a cell containing multiple objects is returned in `clusters`.

**Query example:**

`https://api.pastvu.com/api2?method=photo.getByBounds&params={"z":16,"geometry":{"type":"Polygon","coordinates":[[[-122.49,37.80],[-122.45,37.80],[-122.45,37.84],[-122.49,37.84],[-122.49,37.80]]]},"localWork":false}`

**Response example (shortened):**

```json
{
  "result": {
    "z": 16,
    "photos": [
      {
        "cid": 1953913,
        "file": "path/to/photo.jpg",
        "title": "Golden Gate Bridge construction, view from Fort Baker",
        "dir": "s",
        "geo": [37.836174, -122.477004],
        "year": 1936,
        "year2": 1936
      }
    ],
    "clusters": [
      {
        "geo": [37.832943, -122.479384],
        "c": 2,
        "p": {
          "cid": 561915,
          "file": "path/to/poster.jpg",
          "title": "Bus near Golden Gate Bridge",
          "dir": "s",
          "geo": [-122.479678, 37.832869],
          "year": 1978,
          "year2": 1978
        }
      }
    ]
  },
  "rid": "request-id"
}
```

#### Direct object lookup

Use `localWork: true` to receive every matching object in `photos`. The server does not return `clusters`; the PastVu map clusters these objects in the browser.

**Query example:**

`https://api.pastvu.com/api2?method=photo.getByBounds&params={"z":17,"geometry":{"type":"Polygon","coordinates":[[[-122.49,37.80],[-122.45,37.80],[-122.45,37.84],[-122.49,37.84],[-122.49,37.80]]]},"year":1936,"year2":1936,"localWork":true,"startAt":1731931200000}`

**Response example (shortened):**

```json
{
  "result": {
    "startAt": 1731931200000,
    "z": 17,
    "photos": [
      {
        "cid": 1953913,
        "file": "path/to/photo.jpg",
        "title": "Golden Gate Bridge construction, view from Fort Baker",
        "dir": "s",
        "geo": [37.836174, -122.477004],
        "year": 1936,
        "year2": 1936
      }
    ]
  },
  "rid": "request-id"
}
```

**Key response fields:**

Field | Type | Description |
--- | --- | --- |
`result.startAt` | int | request marker copied from the input; omitted when it was not passed |
`result.z` | int | requested zoom level |
`result.photos` | array | standalone objects in cluster mode or all matching objects in direct lookup mode |
`result.photos[].cid` | int | unique object number |
`result.photos[].file` | string | relative image path |
`result.photos[].dir` | string | shooting direction; omitted when it is not set |
`result.photos[].title` | string | object title |
`result.photos[].geo` | array [lat, lon] | object coordinates as latitude and longitude |
`result.photos[].year`, `result.photos[].year2` | int | first and last year of the object date range |
`result.clusters` | array | server-side clusters; omitted in direct lookup mode |
`result.clusters[].c` | int | number of objects in the cluster |
`result.clusters[].geo` | array [lat, lon] | cluster center coordinates |
`result.clusters[].p` | object | object used as the cluster poster |
`result.clusters[].p.geo` | array [lon, lat] | poster coordinates; unlike `photos[].geo` and cluster `geo`, longitude comes first |
`result.clusters[].g` | array [lon, lat] | cluster grid position; included when the year filter is applied |
`result.clusters[].y` | object | object counts grouped by year; included when the year filter is applied |
`rid` | string | request identifier used for diagnostics |

**Errors:**

Code | When returned |
--- | --- |
`BAD_PARAMS` | `geometry.type` is not `Polygon` or `MultiPolygon`, or `z` is not a number greater than or equal to `1` |

API errors are returned as JSON with a top-level `code` field and HTTP status `200 OK`. Check `code` rather than relying on the HTTP status alone.
