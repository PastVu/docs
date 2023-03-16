---
title: Using the Map
description: Getting started with the map and its key features.
tags:
  - guides
sidebar_position: 1
---

# Using the Map

PastVu webapp allows users to explore historical images and their
corresponding locations on an interactive map. It makes possible to see where
particular image took place and to allow users to discover new historical
images and information.

![Map](/img/docs/guides/map/map.png)

### Navigation

You can use the zoom and pan features to navigate the map and explore
different regions of the world. At the low zoom levels you will see clusters
of the images on the map, clicking on the cluster zooms in the map and shows
smaller clusters or individual images depending on zoom level.

You can point to the image marker to view a thumbnail popup of the
corresponding historical image. Click on the thumbnail to open the the full
image and read more information.

<div class="list-table">

|    |   |
|---:|---|
| !["Home" button](/img/docs/guides/map/map_nav_home.png) | "Home" button repositions the map to the home location, which can be configured in user settings. |
| !["My location" button](/img/docs/guides/map/map_nav_geo.png) | "My location" button positions the map by geolocation data available in the browser. On the first use, browser will ask permission to use this location data. If user denied use of geolocation data, the button will be inactive and non-functional. |

</div>

:::info
Geolocation information about user is not stored in PastVu and used solely to
reposition the map.
:::

:::tip
If user denied use of geolocation data accidentally, re-enabling is possible
in the site settings in the browser (click "View this site information" icon
located to the left of address line in Chrome or Firefox for example).
:::

### Controls

In the top right-hand corner of the map there are several control elements:

<div class="list-table">

|    |   |
|---:|---|
| ![Image type selector](/img/docs/guides/map/map_controls_type.png) | these buttons allow you to change the type of images displayed (photos or pictures/paintings). |
| ![Image opening method button](/img/docs/guides/map/map_controls_open.png) | if this button is active, clicking on the markers (thumbnails) on the map will open each new page with an image in separate tab. |
| ![Map URL copy button](/img/docs/guides/map/map_controls_link.png) | this button can be used to copy URL to the current map position; accessing this URL will open the map exactly as you see it at that moment. |
| ![Map layer selector](/img/docs/guides/map/map_embed_controls_layer.png) | drop-down menu to select the map layer to be displayed. The name of the current layer is displayed as a button title. |

</div>

At the bottom of the map there is a 'time slider' to help limit the number of
image markers shown on the map, leaving only those that fall within a given
time range.

:::tip
The colour scale on the 'time slider' also has meaning - these colours correspond to the colours of the markers on the map that relate to a particular time period.
:::

## Embedded Map

The embedded map on the Pastvu image page functions similarly to the main map
on the Pastvu website, but with the added feature of highlighting the location
of the image. This makes it easier for users to see where the photo was taken
and get a better understanding of its context.

![Embedded Map](/img/docs/guides/map/map_embedded.png)

<div class="list-table">

|   |   |
|---|---|
| ![Copy coordinates button](/img/docs/guides/map/map_embedded_copy.png) | "Copy coordinates" button allows to copy image coordinates in the format `Lat,Lng`. If image does not have coordinates, the button will be inactive. |

</div>

### Edit mode

In the image edit mode, current photo location marker becomes a pin,
which can be moved to change the location. You can use map navigation tools
such as zoom and panning to set location more accurately.

If image did not have coordinates, clicking on the map
sets photo location pin and fills in coordinates field. Location pin can be
moved to achieve required accuracy.

![Image Editing Map](/img/docs/guides/map/map_edit.png)

It is also possible to paste coordinates to the field if they are known, this
will position the map to required location and set a pin at new point.

:::tip
Coordinates field supports a variety of formats. For example, you
can insert coordinates notation used in wikipedia, "51° 30′ 26″ N, 0° 7′ 39″
W", which will be parsed to `Lat,Lng` format and set correctly in the map.
:::

Clicking "Reset the coordinates" button removes image location, this is usually
used when location was set incorrectly and exact location is not known.

