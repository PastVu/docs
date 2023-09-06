---
title: Использование карты
description: Работа с картой и ее основные возможности.
tags:
  - пользователю
sidebar_position: 1
---

# Использование карты

Сайт PastVu позволяет пользователям просматривать исторические изображения и их местоположение на интерактивной карте. Карта позволяет увидеть, где было сделано то или иное изображение, и дает возможность пользователям находить новые исторические изображения и информацию.

![Карта](/img/docs/guides/map/map.png)

### Навигация

Вы можете использовать функции масштабирования и перемещения для навигации по карте и изучения различных регионов мира. При низких уровнях масштабирования вы увидите кластеры изображений на карте, щелчок по кластеру увеличивает масштаб карты и показывает меньшие кластеры или отдельные изображения в зависимости от уровня масштабирования.

Если навести курсор на маркер изображения, можно увидеть всплывающую миниатюру соответствующего исторического изображения. Нажмите на миниатюру, чтобы открыть полное изображение и прочитать дополнительную информацию.

<div class="list-table">

|   |   |
|---:|---|
| ![Кнопка "Домой"](/img/docs/guides/map/map_nav_home.png) | Кнопка "Домой" переводит карту в домашнее местоположение, которое может быть настроено в настройках пользователя. |
| ![Кнопка "Мое местоположение"](/img/docs/guides/map/map_nav_geo.png) | Кнопка "Мое местоположение" позиционирует карту по геолокационным данным браузера. При первом использовании браузер запросит разрешение на использование данных о местоположении. Если пользователь запретит использование геолокационных данных, кнопка будет неактивной и не будет работать. |

</div>

:::info
Информация о геолокации пользователей не хранится в PastVu и используется исключительно для изменения местоположения на карте.
:::

:::tip
Если пользователь случайно отказался от использования геолокационных данных, повторное их включение возможно в настройках сайта в браузере (нажмите на значок "Просмотр информации об этом сайте" расположенный слева от адресной строки в Chrome или Firefox).
:::

### Управление

В правом верхнем углу карты находится несколько управляющих элементов:

<div class="list-table">

|    |   |
|---:|---|
| ![Кнопка выбора типа изображений](/img/docs/guides/map/map_controls_type.png) | эти кнопки позволяют менять тип отображаемых изображений (фотографии или картины/рисунки). |
| ![Кнопка метода открытия изображений](/img/docs/guides/map/map_controls_open.png) | если эта кнопка активирована, то кликая по точкам (миниатюрам) на карте, вы будете открывать каждую новую страницу с изображением в отдельных вкладках. |
| ![Кнопка копирования ссылки на карту](/img/docs/guides/map/map_controls_link.png) | с помощью этой кнопки можно скопировать ссылку на текущее положение карты; при переходе по такой ссылке откроется карта в точно таком же виде, как вы ее видите в этот момент времени. |
| ![Кнопка выбора слоя карты](/img/docs/guides/map/map_embed_controls_layer.png) | раскрывающееся меню для выбора отображаемого слоя карты. В качестве надписи на кнопке выводится название текущего слоя. |

</div>

В нижней части карты расположен "ползунок времени" — он поможет ограничить число отображаемых на карте точек, оставив только те, датировка которых укладывается в заданный диапазон.

:::info
Цветовая шкала на "ползунке времени" также имеет смысл - эти цвета соответствуют цветам точек на карте, относящихся к тому или иному временному периоду.
:::

## Встроенная карта

Встроенная карта на странице изображений Pastvu функционирует аналогично основной карте, но с дополнительной функцией выделения местоположения текущего изображения. Таким образом, пользователю легче понять, где была сделана фотография и лучше понять ее местоположение относительно других снимков.

![Встроенная карта](/img/docs/guides/map/map_embedded.png)

<div class="list-table">

|   |   |
|---|---|
| ![Кнопка копирования координат](/img/docs/guides/map/map_embedded_copy.png) | Кнопка "Копировать координаты" позволяет скопировать координаты изображения в формате `Lat,Lng`. Если у изображения нет координат, кнопка будет неактивна. |

</div>

### Режим редактирования

В режиме редактирования изображения маркер текущего местоположения фотографии становится указателем (пином), который можно перемещать для изменения местоположения. Вы можете использовать инструменты навигации по карте такие как масштабирование и перемещение для более точного выбора местоположения.

Если изображение не имеет координат, щелчок на карте установит указатель местоположения фотографии и заполнит поле координат. Указатель местоположения можно перемещать для достижения требуемой точности.

![Встроенная карта в режиме редактирования](/img/docs/guides/map/map_edit.png)

Можно также вставить координаты в поле, если они известны. Это позволит переместить карту в нужное место и установить указатель в новой точке.

:::tip
Поле координат поддерживает различные форматы. Например, вы
можно вставить координаты, используемые в Википедии: "51° 30′ 26″ N, 0° 7′ 39″
W", которые будут преобразованы в формат `Lat,Lng` и правильно отображены на карте.
:::

Нажатие кнопки "Сбросить координаты" отменяет установку местоположения изображения, обычно это применяется, когда местоположение было установлено неверно и точное местоположение неизвестно.