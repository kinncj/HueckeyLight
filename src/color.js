'use strict';

function _gammaCorrection(value) {
    let result = value;

    if (value > 0.04045) {
        result = Math.pow((value + 0.055) / (1.0 + 0.055), 2.4);
    } else {
        result = value / 12.92;
    }

    return result;
}

var XY = function (x, y) {
        this.x = x;
        this.y = y;
    }
    , hueLimits = {
        red: new XY(0.675, 0.322),
        green: new XY(0.4091, 0.518),
        blue: new XY(0.167, 0.04)
    }
    , livingColorsLimits = {
        red: new XY(0.704, 0.296),
        green: new XY(0.2151, 0.7106),
        blue: new XY(0.138, 0.08)
    }
    , defaultLimits = {
        red: new XY(1.0, 0),
        green: new XY(0.0, 1.0),
        blue: new XY(0.0, 0.0)
    }
    ;

function _crossProduct(p1, p2) {
    return (p1.x * p2.y - p1.y * p2.x);
}

function _isInColorGamut(p, lampLimits) {
    var v1 = new XY(
            lampLimits.green.x - lampLimits.red.x
            , lampLimits.green.y - lampLimits.red.y
        )
        , v2 = new XY(
            lampLimits.blue.x - lampLimits.red.x
            , lampLimits.blue.y - lampLimits.red.y
        )
        , q = new XY(p.x - lampLimits.red.x, p.y - lampLimits.red.y)
        , s = _crossProduct(q, v2) / _crossProduct(v1, v2)
        , t = _crossProduct(v1, q) / _crossProduct(v1, v2)
        ;

    return (s >= 0.0) && (t >= 0.0) && (s + t <= 1.0);
}

module.exports = function(rbg) {
    let temp = rbg.trim().split(',');
    let r    = temp[0];
    let g    = temp[1];
    let b    = temp[2];

    r = _gammaCorrection(r);
    g = _gammaCorrection(g);
    b = _gammaCorrection(b);
    
    let X = r * 0.4360747 + g * 0.3850649 + b * 0.0930804;
    let Y = r * 0.2225045 + g * 0.7168786 + b * 0.0406169;
    let Z = r * 0.0139322 + g * 0.0971045 + b * 0.7141733;
    let cx = X / (X + Y + Z);
    let cy = Y / (X + Y + Z);
    let xyPoint;

    cx = isNaN(cx) ? 0.0 : cx;
    cy = isNaN(cy) ? 0.0 : cy;

    xyPoint = new XY(cx, cy);


    return [xyPoint.x, xyPoint.y];
}
