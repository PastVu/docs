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

Returns photos and clusters on the map by the passed zoom, GeoJSON object (Polygon or MultiPolygon) and optional year limit. The sequence of points in the array that forms the polygon must follow a counterclockwise path to sample objects within its boundaries (see [RFC7946 3.1.6](https://www.rfc-editor.org/rfc/rfc7946#section-3.1.6)). The order of coordinates at points is `[lon, lat]`. From zoom 17 and up only photos are returned, for zoom level 16 and below both photos and clusters can be returned.

Parameter | Mandatory | Type | Default | Description |
--- | --- | --- | --- | --- |
geometry | ✓ | GeoJSON (Polygon or MultiPolygon) | search area |
z | ✓ | int | |  zoom level
isPainting | | bool | 0 | return only pictures in the response |
year | | int | | lower limit of the year of the photo |
year2 | | int | | upper limit of the year of the photo |
localWork | | bool | 0 | return array of `photos` (set 1 when using zoom value >= 17) |

**Query example:**

`https://api.pastvu.com/api2?method=photo.getByBounds&params={"z":11,"geometry":{"type":"Polygon","coordinates":[[[37.29034423828125,55.56902805913944],[37. 95501708984375,55.56902805913944],[37.95501708984375,55.92150795277898],[37.29034423828125,55.92150795277898],[37.29034423828125,55.56902805913944]]]}}`
