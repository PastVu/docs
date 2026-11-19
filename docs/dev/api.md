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

Returns the comment tree for a photo or news item. Top-level comments are returned in `comments`; replies are nested in the parent comment's `comments` array.

Parameter | Mandatory | Type | Default | Description |
--- | --- | --- | --- | --- |
cid | ✓ | int | | unique object number |
type | | string | `photo` | object type: `photo` or `news` |
showDel | | bool | `false` | include deleted comments when the authenticated user has permission to view them |

Only the exact value `news` selects a news item. If `type` is omitted or has any other value, the method handles `cid` as a photo number. `showDel` has no effect on anonymous requests.

**Query example:**

`https://api.pastvu.com/api2?method=comment.giveForObj&params={"cid":539434}`

**Response example (shortened):**

```json
{
  "result": {
    "comments": [
      {
        "cid": 1324546,
        "user": "user1",
        "stamp": 1488382828246,
        "txt": "Вероятно, снимок сделан с территории Кремля...",
        "s": 5,
        "type": 1,
        "level": 0,
        "comments": [
          {
            "cid": 1324559,
            "user": "user2",
            "stamp": 1488384195442,
            "txt": "Спасибо, поправлено.",
            "parent": 1324546,
            "level": 1,
            "s": 5,
            "type": 1,
            "latest": true
          }
        ]
      }
    ],
    "countTotal": 2,
    "users": {
      "user1": {
        "disp": "User One",
        "login": "user1",
        "ranks": ["mec_gold", "adviser"],
        "online": false
      },
      "user2": {
        "avatar": "/_a/h/user2.png",
        "disp": "User Two",
        "login": "user2",
        "ranks": [],
        "online": false
      }
    },
    "latestCid": 1324559,
    "cid": 539434
  },
  "rid": "request-id"
}
```

**Key response fields:**

Field | Type | Description |
--- | --- | --- |
`result.cid` | int | requested object number |
`result.comments` | array | top-level comments; replies are nested recursively in `comments` |
`result.comments[].cid` | int | unique comment number |
`result.comments[].user` | string | comment author's login; corresponding profile data is in `result.users` |
`result.comments[].stamp` | int | comment creation time as a Unix timestamp in milliseconds |
`result.comments[].txt` | string | comment text as HTML; omitted for a deleted-comment placeholder |
`result.comments[].parent` | int | parent comment number; included for replies |
`result.comments[].level` | int | nesting level, starting with `0` for a top-level comment |
`result.comments[].comments` | array | direct replies to the comment; omitted for a deleted-comment placeholder |
`result.comments[].del` | bool | `true` for a deleted-comment placeholder returned with `showDel` |
`result.comments[].latest` | bool | whether this is the newest comment in the tree |
`result.countTotal` | int | total number of non-deleted comments, including nested replies |
`result.users` | object | comment authors keyed by login |
`result.latestCid` | int | number of the newest comment |
`rid` | string | request identifier used for diagnostics |

Authenticated responses also include `countNew`, `countDel`, and `canReply`. `canModerate` is `true` for a moderator of the object and is otherwise omitted. Individual comments can include permission and unread-status fields.

An authenticated request records the current time as the user's last comment view, resets the new-comment counter, and can clear a scheduled comment notification for the object.

With `showDel: true`, an eligible deleted comment is returned as a placeholder with `del: true`. Its `txt` and nested `comments` fields are omitted.

When no comments match, the empty response depends on authentication:

- an anonymous response omits `users` and includes `latestCid: 0`;
- an authenticated response includes `users: {}` and omits `latestCid`.

**Errors:**

Code | When returned |
--- | --- |
`BAD_PARAMS` | `cid` is missing, is `0`, or cannot be converted to a number |
`NO_SUCH_PHOTO` | a photo does not exist or is not available to the current user |
`COMMENT_NO_OBJECT` | a news item does not exist or is not available to the current user |

API errors are returned as JSON with a top-level `code` field and HTTP status `200 OK`. Check `code` rather than relying on the HTTP status alone.

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

Returns public photo or painting data for a map area defined by a GeoJSON `Polygon` or `MultiPolygon`. The selection rule depends on `localWork`:

`localWork` | Mode | Response |
--- | --- | --- |
`false` | server-side clustering | cluster cells selected by their grid position `g`; single-object cells are returned in `photos` and groups in `clusters` |
`true` | direct object lookup | objects whose coordinates are inside `geometry`, returned in `photos`; `clusters` is omitted |

`localWork` is not selected automatically from `z` when `geometry` is used. Set it explicitly. The PastVu map uses server-side clustering through zoom level 16 and direct lookup from zoom level 17.

GeoJSON positions use `[lon, lat]`. Close each polygon ring by repeating its first position at the end. The exterior ring must follow a counterclockwise path; see [RFC 7946, section 3.1.6](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.6).

Parameter | Mandatory | Type | Default | Description |
--- | --- | --- | --- | --- |
geometry | ✓ | GeoJSON `Polygon` or `MultiPolygon` | | search area |
z | ✓ | int | | zoom level, starting with `1`; selects the server cluster grid in cluster mode and is echoed in the response |
isPainting | | bool | `false` | search paintings instead of photos |
year | | int | | lower bound for the object's `year` field; use together with `year2` |
year2 | | int | | upper bound for the object's `year` field; use together with `year` |
localWork | | bool | `false` | use direct object lookup instead of server-side clusters |
startAt | | int | | client request marker echoed unchanged in the response |

The year filter matches the object's first year (`year`) only. It does not test whether the complete `year`–`year2` object date range overlaps the requested interval. For example, an object dated 1930–1940 is not returned for a 1936–1936 request.

The filter is applied only when both values are numbers, `year` is not greater than `year2`, and both values are within the supported range: 1826–2000 for photos or -100–1980 for paintings. The selected interval must be shorter than the complete supported range. Otherwise, the year filter is ignored.

#### Server-side clustering

Use `localWork: false` to receive precomputed clusters for the requested `z`. The server selects a cluster when its grid position `g` is inside `geometry`; it does not test every object in that cluster against the polygon. Near the boundary, the response can therefore include objects outside the polygon or omit objects inside it. A selected cluster cell containing one object is returned in `photos`; a cell containing multiple objects is returned in `clusters`.

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

Use `localWork: true` to receive in `photos` every object whose coordinates are inside `geometry`. The server does not return `clusters`; the PastVu map clusters these objects in the browser.

Direct lookup has no server-side result limit or pagination, and `z` does not reduce the number of matched objects. Keep `geometry` small enough for the client to receive and process the complete response.

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
