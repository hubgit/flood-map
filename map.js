var BingLayer = L.TileLayer.extend({
    getTileUrl: function (tilePoint) {
        this._adjustTilePoint(tilePoint);

        return L.Util.template(this._url, {
            z: this._getZoomForUrl(),
            //s: this._getSubdomain(tilePoint),
            q: this._quadKey(tilePoint.x, tilePoint.y, this._getZoomForUrl())
        });
    },
    _quadKey: function (x, y, z) {
        var quadKey = [];

        for (var i = z; i > 0; i--) {
            var digit = 0;

            var mask = 1 << (i - 1);

            if ((x & mask) != 0) {
                digit += 1;
            }

            if ((y & mask) != 0) {
                digit += 2;
            }

            quadKey.push(digit);
        }

        return quadKey.join('');
    }
});

var map = new L.Map('map', { layers: [
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
        maxZoom: 13
    }),
    new BingLayer('https://eafloodalertsblob.blob.core.windows.net/floodalertsv3-tiles/2014-02-16-12-02-02Z/{z}/{q}.png', {
        attribution: 'Source: Environment Agency via Shoothill',
        maxZoom: 12,
        opacity: 0.6
    })
]});

map.setView([53.5, -1.5], 10);