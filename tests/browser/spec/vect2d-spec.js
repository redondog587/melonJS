import { expect } from "expect";
import * as me from "./../public/lib/melonjs.module.js";

describe("me.Vector2d", function () {
    var x = 1,
        y = 2;

    var a, b, c;

    it("should be initialized to a (0, 0) 2d vector", function () {
        a = new me.Vector2d();
        b = new me.Vector2d();
        c = new me.Vector2d();

        expect(a.toString()).toEqual("x:0,y:0");
    });

    it("a(1, 2) should be copied into b", function () {
        a.set(x, y);
        b.copy(a);

        expect(b.equals(a)).toEqual(true);
        expect(b.equals(a.x, a.y)).toEqual(true);
    });

    it("set (1, 2) into a defined vector", function () {
        a.set(x, y);

        expect(a.toString()).toEqual("x:" + x + ",y:" + y);
    });

    it("add (1, 2) to (-1, -2)", function () {
        a.set(x, y);
        b.set(-x, -y);

        expect(a.add(b).toString()).toEqual("x:0,y:0");
    });

    it("sub (1, 2) to (-1, -2)", function () {
        a.set(x, y);
        b.set(-x, -y);

        expect(a.sub(b).toString()).toEqual("x:" + (x - -x) + ",y:" + (y - -y));
    });

    it("scale (1, 2) by (-1, -2)", function () {
        a.set(x, y);
        b.set(-x, -y);

        expect(a.scaleV(b).toString()).toEqual("x:" + x * -x + ",y:" + y * -y);
    });

    it("negate (1, 2)", function () {
        a.set(x, y);

        expect(a.negateSelf().toString()).toEqual("x:" + -x + ",y:" + -y);
    });

    it("dot Product (1, 2) and (-1, -2)", function () {
        a.set(x, y);
        b.set(-x, -y);

        // calculate the dot product
        expect(a.dot(b)).toEqual(-x * x - y * y);
    });

    it("cross Product (2, 3) and (5, 6)", function () {
        a.set(2, 3);
        b.set(5, 6);

        // calculate the cross product
        expect(a.cross(b)).toEqual(-3);
    });

    it("length/lengthSqrt functions", function () {
        a.set(x, 0);
        b.set(0, -y);
        c.set(0, 0);

        expect(a.length()).toEqual(x);
        expect(a.length2()).toEqual(x * x);
        expect(b.length()).toEqual(y);
        expect(b.length2()).toEqual(y * y);
        expect(c.length()).toEqual(0);
        expect(c.length2()).toEqual(0);

        a.set(x, y);
        expect(a.length()).toEqual(Math.sqrt(x * x + y * y));
        expect(a.length2()).toEqual(x * x + y * y);
    });

    it("lerp functions", function () {
        a.set(x, 0);
        b.set(0, -y);

        expect(a.clone().lerp(a, 0).equals(a.lerp(a, 0.5))).toEqual(true);
        expect(a.clone().lerp(a, 0).equals(a.lerp(a, 1))).toEqual(true);

        expect(a.clone().lerp(b, 0).equals(a)).toEqual(true);

        expect(a.clone().lerp(b, 0.5).x).toEqual(x * 0.5);
        expect(a.clone().lerp(b, 0.5).y).toEqual(-y * 0.5);

        expect(a.clone().lerp(b, 1).equals(b)).toEqual(true);
    });

    it("normalize function", function () {
        a.set(x, 0);
        b.set(0, -y);

        a.normalize();
        expect(a.length()).toEqual(1);
        expect(a.x).toEqual(1);

        b.normalize();
        expect(b.length()).toEqual(1);
        expect(b.y).toEqual(-1);
    });

    it("distance function", function () {
        a.set(x, 0);
        b.set(0, -y);
        c.set(0, 0);

        expect(a.distance(c)).toEqual(x);
        expect(b.distance(c)).toEqual(y);
    });

    it("min/max/clamp", function () {
        a.set(x, y);
        b.set(-x, -y);
        c.set(0, 0);

        c.copy(a).minV(b);
        expect(c.x).toEqual(-x);
        expect(c.y).toEqual(-y);

        c.copy(a).maxV(b);
        expect(c.x).toEqual(x);
        expect(c.y).toEqual(y);

        c.set(-2 * x, 2 * x);
        c.clampSelf(-x, x);
        expect(c.x).toEqual(-x);
        expect(c.y).toEqual(x);
    });

    it("ceil/floor", function () {
        expect(
            new me.Vector2d(-0.1, 0.1)
                .floorSelf()
                .equals(new me.Vector2d(-1, 0))
        ).toEqual(true);
        expect(
            new me.Vector2d(-0.5, 0.5)
                .floorSelf()
                .equals(new me.Vector2d(-1, 0))
        ).toEqual(true);
        expect(
            new me.Vector2d(-0.9, 0.9)
                .floorSelf()
                .equals(new me.Vector2d(-1, 0))
        ).toEqual(true);

        expect(
            new me.Vector2d(-0.1, 0.1).ceilSelf().equals(new me.Vector2d(0, 1))
        ).toEqual(true);
        expect(
            new me.Vector2d(-0.5, 0.5).ceilSelf().equals(new me.Vector2d(0, 1))
        ).toEqual(true);
        expect(
            new me.Vector2d(-0.9, 0.9).ceilSelf().equals(new me.Vector2d(0, 1))
        ).toEqual(true);
    });

    it("project a on b", function () {
        a.set(x, y);
        b.set(-x, -y);

        // the following only works with (-)1, (-)2style of values
        expect(a.project(b).equals(b)).toEqual(true);
    });

    it("angle between a and b", function () {
        a.set(x, y);
        b.set(-x, -y);

        // why is this not perfectly 180 degrees ?
        expect(Math.round(me.Math.radToDeg(a.angle(b)))).toEqual(180);

        b.set(4 * x, -y);
        expect(a.angle(b)).toEqual(Math.PI / 2);
    });

    it("perp and rotate function", function () {
        a.set(x, y);
        b.copy(a).perp();
        // perp rotate the vector by 90 degree clockwise on the z axis
        c.copy(a).rotate(Math.PI / 2);

        expect(a.angle(b)).toEqual(a.angle(c));
    });

    it("convert vector to iso coordinates", function () {
        a.set(32, 32);

        a.toIso();
        expect(a.toString()).toEqual("x:0,y:32");

        a.to2d();
        expect(a.toString()).toEqual("x:32,y:32");
    });

    it("angle function", function () {
        a.set(6, 3);
        b.set(5, 13);
        expect(me.Math.radToDeg(a.angle(b))).toBeCloseTo(42, -1);

        a.set(3, -6);
        b.set(8, 4);
        expect(me.Math.radToDeg(a.angle(b))).toBeCloseTo(90, -1);
    });
});
