!function e(t, n, r) {
    function i(a, s) {
        if (!n[a]) {
            if (!t[a]) {
                var u = "function" == typeof require && require;
                if (!s && u)
                    return u(a, !0);
                if (o)
                    return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND",
                c
            }
            var l = n[a] = {
                exports: {}
            };
            t[a][0].call(l.exports, function(e) {
                var n = t[a][1][e];
                return i(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < r.length; a++)
        i(r[a]);
    return i
}({
    1: [function(e, t, n) {
        function r(e) {
            var t = window.WIDTH = window.innerWidth
              , n = window.HEIGHT = window.innerHeight;
            this.setSize(t, n)
        }
        function i(e) {
            var t, n;
            "undefined" != typeof document.hidden ? (t = "hidden",
            n = "visibilitychange") : "undefined" != typeof document.mozHidden ? (t = "mozHidden",
            n = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (t = "msHidden",
            n = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (t = "webkitHidden",
            n = "webkitvisibilitychange"),
            "undefined" != typeof document.addEventListener && document.addEventListener(n, function() {
                document[t] ? e.onLeaveTab() : setTimeout(e.onFocusTab.bind(e), 50)
            }, !1)
        }
        function o(e) {}
        var a = e("3")
          , s = e("5")
          , u = e("2")
          , c = function(e) {
            if (e = void 0 !== e ? e : {},
            this.renderer = new THREE.WebGLRenderer({
                alpha: !0,
                antialias: !0,
                canvas: e.canvas || document.querySelector("canvas")
            }),
            THREE.Extensions = this.renderer.extensions,
            this.config = {
                fps: void 0 !== e.fps && e.fps,
                profiling: void 0 !== e.profiling && e.profiling
            },
            e && e.maxPixelRatio)
                var t = window.devicePixelRatio > e.maxPixelRatio ? e.maxPixelRatio : window.devicePixelRatio;
            else
                var t = window.devicePixelRatio;
            window.isMobile && (t = t > 1.5 ? 1.5 : t),
            this.renderer.setPixelRatio(t),
            this.setSize(e.width || window.innerWidth, e.height || window.innerHeight),
            void 0 !== e.autoClear && (this.renderer.autoClear = e.autoClear),
            void 0 !== e.clearColor && this.renderer.setClearColor(e.clearColor),
            void 0 !== e.supportsTextureLod && e.supportsTextureLod !== !0 || THREE.Extensions.get("EXT_shader_texture_lod"),
            this.clock = new THREE.Clock,
            this.paused = !1,
            this.scenes = [],
            this.scene = null,
            window.onresize = r.bind(this),
            window.addEventListener("keyup", o.bind(this)),
            this.renderer.domElement.addEventListener("mousemove", function(e) {
                window.mouseX = e.pageX / WIDTH * 2 - 1,
                window.mouseY = 1 - e.pageY / HEIGHT * 2
            }),
            this.config.fps && (this.fpsCounter = new u,
            this.counter = document.createElement("div"),
            document.querySelectorAll("body")[0].appendChild(this.counter),
            this.counter.setAttribute("style", "position:absolute;top:20px;left:100px;color:#ff00ff;display:block !important;z-index:999999;")),
            i(this)
        };
        c.prototype = {
            render: function(e) {
                this.renderScene(this.scene, this.camera)
            },
            renderScene: function(e, t) {
                this.renderer.render(e, t)
            },
            update: function(e) {
                _.each(this.scenes, function(t) {
                    _.each(t.materials, function(e) {
                        e.pbr && e.refreshUniforms(this.camera)
                    }, this),
                    t.update && (t.updateMatrixWorld(!0),
                    t.update(this.renderer, e))
                }, this)
            },
            doUpdate: function() {
                var e = {
                    delta: 0,
                    elapsed: 0
                };
                return function() {
                    if (e.delta = this.clock.getDelta(),
                    e.elapsed = this.clock.getElapsedTime(),
                    !this.paused) {
                        requestAnimationFrame(this.doUpdate.bind(this));
                        var t = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
                        TWEEN.update(t),
                        s.updateTimers(e),
                        this.config.profiling && console.time("update"),
                        this.update(e),
                        this.config.profiling && console.timeEnd("update"),
                        this.render(e),
                        this.started || (this.started = !0),
                        this.config.fps && this.fpsCounter.update(e, function(e) {
                            this.counter.textContent = e + " FPS"
                        }
                        .bind(this))
                    }
                }
            }(),
            start: function() {
                this.doUpdate()
            },
            pause: function() {
                this.paused || (this.clock.stop(),
                this.paused = !0,
                this.config.fps && (this.counter.textContent += " (paused)"))
            },
            resume: function() {
                this.paused && (this.clock.start(),
                this.paused = !1,
                this.started && this.doUpdate())
            },
            onLeaveTab: function() {
                this.paused || (this.pause(),
                this.shouldResume = !0)
            },
            onFocusTab: function() {
                this.shouldResume && (this.resume(),
                this.shouldResume = !1)
            },
            setAspectRatio: function(e) {
                this.camera && (this.camera.aspect = e,
                this.camera.updateProjectionMatrix())
            },
            setSize: function(e, t) {
                this.started && this.setAspectRatio(e / t),
                this.renderer.setSize(e, t)
            }
        },
        c.mixin(a),
        t.exports = c
    }
    , {
        2: 2,
        3: 3,
        5: 5
    }],
    2: [function(e, t, n) {
        var r = function() {
            this.frames = 0,
            this.fps = 0,
            this.lastTime = 0
        };
        r.prototype = {
            update: function(e, t) {
                var e = 1e3 * e.elapsed;
                this.frames++,
                e > this.lastTime + 1e3 && (this.fps = Math.round(1e3 * this.frames / (e - this.lastTime)),
                t(this.fps),
                this.lastTime = e,
                this.frames = 0)
            }
        },
        t.exports = r
    }
    , {}],
    3: [function(e, t, n) {
        var r = {
            on: function(e, t, n) {
                if (!s(this, "on", e, [t, n]) || !t)
                    return this;
                this._events || (this._events = {});
                var r = this._events[e] || (this._events[e] = []);
                return r.push({
                    callback: t,
                    context: n,
                    ctx: n || this
                }),
                this
            },
            once: function(e, t, n) {
                if (!s(this, "once", e, [t, n]) || !t)
                    return this;
                var r = this
                  , i = _.once(function() {
                    r.off(e, i),
                    t.apply(this, arguments)
                });
                return i._callback = t,
                this.on(e, i, n)
            },
            off: function(e, t, n) {
                var r, i, o, a, u, c, l, h;
                if (!this._events || !s(this, "off", e, [t, n]))
                    return this;
                if (!e && !t && !n)
                    return this._events = void 0,
                    this;
                for (a = e ? [e] : _.keys(this._events),
                u = 0,
                c = a.length; u < c; u++)
                    if (e = a[u],
                    o = this._events[e]) {
                        if (this._events[e] = r = [],
                        t || n)
                            for (l = 0,
                            h = o.length; l < h; l++)
                                i = o[l],
                                (t && t !== i.callback && t !== i.callback._callback || n && n !== i.context) && r.push(i);
                        r.length || delete this._events[e]
                    }
                return this
            },
            trigger: function(e) {
                if (!this._events)
                    return this;
                var t = a.call(arguments, 1);
                if (!s(this, "trigger", e, t))
                    return this;
                var n = this._events[e]
                  , r = this._events.all;
                return n && u(n, t),
                r && u(r, arguments),
                this
            },
            stopListening: function(e, t, n) {
                var r = this._listeningTo;
                if (!r)
                    return this;
                var i = !t && !n;
                n || "object" != typeof t || (n = this),
                e && ((r = {})[e._listenId] = e);
                for (var o in r)
                    e = r[o],
                    e.off(t, n, this),
                    (i || _.isEmpty(e._events)) && delete this._listeningTo[o];
                return this
            }
        }
          , i = /\s+/
          , o = []
          , a = o.slice
          , s = function(e, t, n, r) {
            if (!n)
                return !0;
            if ("object" == typeof n) {
                for (var o in n)
                    e[t].apply(e, [o, n[o]].concat(r));
                return !1
            }
            if (i.test(n)) {
                for (var a = n.split(i), s = 0, u = a.length; s < u; s++)
                    e[t].apply(e, [a[s]].concat(r));
                return !1
            }
            return !0
        }
          , u = function(e, t) {
            var n, r = -1, i = e.length, o = t[0], a = t[1], s = t[2];
            switch (t.length) {
            case 0:
                for (; ++r < i; )
                    (n = e[r]).callback.call(n.ctx);
                return;
            case 1:
                for (; ++r < i; )
                    (n = e[r]).callback.call(n.ctx, o);
                return;
            case 2:
                for (; ++r < i; )
                    (n = e[r]).callback.call(n.ctx, o, a);
                return;
            case 3:
                for (; ++r < i; )
                    (n = e[r]).callback.call(n.ctx, o, a, s);
                return;
            default:
                for (; ++r < i; )
                    (n = e[r]).callback.apply(n.ctx, t);
                return
            }
        }
          , c = {
            listenTo: "on",
            listenToOnce: "once"
        };
        _.each(c, function(e, t) {
            r[t] = function(t, n, r) {
                var i = this._listeningTo || (this._listeningTo = {})
                  , o = t._listenId || (t._listenId = _.uniqueId("l"));
                return i[o] = t,
                r || "object" != typeof n || (r = this),
                t[e](n, r, this),
                this
            }
        }),
        t.exports = r
    }
    , {}],
    4: [function(e, t, n) {
        var r = function(e) {
            e = _.extend({}, {
                duration: 1e3,
                repeat: !1,
                onStart: function() {},
                onEnd: function() {}
            }, e),
            this.duration = e.duration,
            this.repeat = e.repeat,
            this.startCallback = e.onStart,
            this.endCallback = e.onEnd,
            this.reset()
        };
        r.inherit(Object, {
            reset: function() {
                return this.started = !1,
                this.paused = !1,
                this.ended = !1,
                this.elapsedTime = 0,
                this
            },
            start: function() {
                return this.started || this.ended ? this : (this.started = !0,
                this.startCallback(),
                this)
            },
            stop: function() {
                return this.started ? this.reset() : this
            },
            pause: function() {
                return this.paused = !0,
                this
            },
            resume: function() {
                return this.paused = !1,
                this
            },
            update: function(e) {
                return !this.started || this.paused || this.ended ? this : (this.elapsedTime += 1e3 * e.delta,
                this.elapsedTime > this.duration && (this.endCallback(),
                this.ended = !0),
                this)
            }
        }),
        t.exports = r
    }
    , {}],
    5: [function(e, t, n) {
        var r = e("4")
          , i = {
            _timers: {}
        };
        i.createTimer = function(e) {
            var t = _.uniqueId("timer_")
              , n = new r(e);
            return n.id = t,
            i._timers[t] = n,
            n
        }
        ,
        i.delay = function(e, t, n) {
            var r = i.createTimer({
                duration: e,
                onEnd: function() {
                    t.call(n),
                    delete i._timers[this.id]
                }
            }).start();
            return r
        }
        ,
        i.updateTimers = function(e) {
            _.each(i._timers, function(t) {
                t.update(e)
            })
        }
        ,
        i.clearTimers = function() {
            _.each(i._timers, function(e) {
                e.onEnd = null
            }),
            i._timers = {}
        }
        ,
        t.exports = i
    }
    , {
        4: 4
    }],
    6: [function(e, t, n) {
        function r(e, t, n) {
            for (var r = e * e, i = 2 * e * e, o = 3 * e * e, a = 0, s = 0; s < r; s++)
                n[a++] = t[s],
                n[a++] = t[s + r],
                n[a++] = t[s + i],
                n[a++] = t[s + o]
        }
        var i = function(e, t, n) {
            this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager,
            this._size = e,
            this._interleaved = t
        };
        i.prototype = Object.create(THREE.CompressedTextureLoader.prototype),
        i.prototype._parser = function(e) {
            for (var t = [], n = Math.log2(this._size), i = 0, o = 0; o <= n; o++) {
                var a = Math.pow(2, n - o)
                  , s = a * a * 4;
                if (i >= e.byteLength)
                    break;
                for (var u = 0; u < 6; u++) {
                    if (t[u] || (t[u] = []),
                    this._interleaved) {
                        var c = new Uint8Array(e,i,s)
                          , l = new Uint8Array(s);
                        r(a, c, l)
                    } else
                        var l = new Uint8Array(e,i,s);
                    t[u].push({
                        data: l,
                        width: a,
                        height: a
                    }),
                    i += s
                }
            }
            return {
                isCubemap: !0,
                mipmaps: _.flatten(t),
                mipmapCount: n + 1,
                width: this._size,
                height: this._size,
                format: THREE.RGBAFormat,
                minFilter: THREE.LinearMipMapLinearFilter,
                magFilter: THREE.LinearFilter,
                wrapS: THREE.ClampToEdgeWrapping,
                wrapT: THREE.ClampToEdgeWrapping,
                type: THREE.UnsignedByteType
            }
        }
        ,
        Math.log2 = Math.log2 || function(e) {
            return Math.log(e) * Math.LOG2E
        }
        ,
        t.exports = i
    }
    , {}],
    7: [function(e, t, n) {
        function r(e, t, n) {
            for (var r = e * e, i = 2 * e * e, o = 3 * e * e, a = 0, s = 0; s < r; s++)
                n[a++] = t[s],
                n[a++] = t[s + r],
                n[a++] = t[s + i],
                n[a++] = t[s + o]
        }
        var i = function(e, t, n) {
            this.manager = void 0 !== n ? n : THREE.DefaultLoadingManager,
            this._size = e,
            this._interleaving = t
        };
        i.prototype = Object.create(THREE.BinaryTextureLoader.prototype),
        i.prototype._parser = function(e) {
            var t, n = this._size;
            if (this._interleaving) {
                var i = n * n * 4
                  , o = new Uint8Array(e);
                t = new Uint8Array(i),
                r(n, o, t)
            } else
                t = new Uint8Array(e);
            return {
                width: n,
                height: n,
                data: t,
                format: THREE.RGBAFormat,
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                wrapS: THREE.ClampToEdgeWrapping,
                wrapT: THREE.ClampToEdgeWrapping,
                type: THREE.UnsignedByteType
            }
        }
        ,
        t.exports = i
    }
    , {}],
    8: [function(e, t, n) {
        function r(e) {
            var t = e.slice(0, 27)
              , n = 1 / (2 * Math.sqrt(Math.PI))
              , r = -(.5 * Math.sqrt(3 / Math.PI))
              , i = -r
              , o = r
              , a = .5 * Math.sqrt(15 / Math.PI)
              , s = -a
              , u = .25 * Math.sqrt(5 / Math.PI)
              , c = s
              , l = .25 * Math.sqrt(15 / Math.PI)
              , h = [n, n, n, r, r, r, i, i, i, o, o, o, a, a, a, s, s, s, u, u, u, c, c, c, l, l, l];
            return h.map(function(e, n) {
                return e * t[n]
            })
        }
        var i = function(e) {
            THREE.XHRLoader.call(this),
            this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
        };
        i.prototype = Object.create(THREE.XHRLoader.prototype),
        i.prototype.load = function(e, t, n, i) {
            THREE.XHRLoader.prototype.load.call(this, e, function(e) {
                var n = JSON.parse(e)
                  , i = r(n);
                t(i)
            }, n, i)
        }
        ,
        t.exports = i
    }
    , {}],
    9: [function(e, t, n) {
        var r = (e("18"),
        e("19"))
          , i = e("17")
          , o = (e("11"),
        THREE.MaterialLoader.prototype.parse)
          , a = null;
        THREE.MaterialLoader.setShaders = function(e) {
            a = e
        }
        ,
        THREE.MaterialLoader.prototype.parse = function(e) {
            var t = o.call(this, e);
            if (e.customType && "MatcapMaterial" === e.customType)
                return i.create({
                    uuid: e.uuid,
                    name: e.name,
                    normalMap: t.normalMap,
                    matcapMap: THREE.ImageUtils.loadTexture("textures/matcap.jpg"),
                    normalMapFactor: 1
                });
            if (e.customType && "PBRMaterial" === e.customType) {
                var n = e.metalGlossMap ? this.getTexture(e.metalGlossMap) : null
                  , s = e.normalMap2 ? this.getTexture(e.normalMap2) : null;
                return r.create({
                    vertexShader: a["pbr.vs"],
                    fragmentShader: a["pbr.fs"],
                    uuid: e.uuid,
                    name: e.name,
                    color: e.color,
                    opacity: t.opacity,
                    transparent: t.transparent,
                    alphaTest: t.alphaTest,
                    environment: e.environment,
                    exposure: e.exposure,
                    albedoMap: t.map,
                    metalGlossMap: n,
                    metalFactor: e.metalFactor,
                    glossFactor: e.glossFactor,
                    normalMap: t.normalMap,
                    normalMap2: s,
                    lightMap: t.lightMap,
                    aoMap: t.aoMap,
                    aoFactor: e.aoFactor,
                    occludeSpecular: e.occludeSpecular
                })
            }
            if ("SkyboxMaterial" === e.customType) {
                var u = THREE.ShaderLib.cube;
                t.vertexShader = a["skybox.vs"],
                t.fragmentShader = a["skybox.fs"],
                t.uniforms = THREE.UniformsUtils.clone(u.uniforms),
                t.uniforms.tCube.value = this.getTexture(e.cubemap)
            }
            return t
        }
    }
    , {
        11: 11,
        17: 17,
        18: 18,
        19: 19
    }],
    10: [function(e, t, n) {
        var r = e("22")
          , i = e("11")
          , o = function(e) {
            e.manager && (this.manager = e.manager),
            e.cubemaps && (this.cubemaps = e.cubemaps),
            e.sh && (this.sh = e.sh),
            e.textures && (this.textures = e.textures),
            e.panoramas && (this.panoramas = e.panoramas)
        };
        o.prototype.load = function() {
            var e = {};
            return this.cubemaps && (e.cubemap = i.loadSpecularCubemaps(this.cubemaps)),
            this.panoramas && (e.panorama = i.loadPanoramas(this.panoramas)),
            this.sh && (e.sh = i.loadSH(this.sh)),
            this.textures && (e.texture = i.loadTextures(this.textures, "./")),
            r.props(e)
        }
        ,
        t.exports = o
    }
    , {
        11: 11,
        22: 22
    }],
    11: [function(e, t, n) {
        function r(e, t) {
            return {
                _cache: t || {},
                load: function(t, n, r, i, o) {
                    var a = this._cache;
                    _.has(a, o) ? resolve(a[o]) : e.load(t, function(e) {
                        a[o] = e,
                        n.apply(this, arguments)
                    }, r, i)
                },
                get: function(e) {
                    return _.has(this._cache, e) || console.error("Texture not found: " + e),
                    this._cache[e]
                }
            }
        }
        function i(e, t, n, r) {
            return _.isArray(e) || (e = [e]),
            s.all(_.map(e, function(e) {
                if (r)
                    return r(u(t, e), e, n)
            }))
        }
        function o(e, t, n) {
            return new s(function(r, i) {
                n.load(e, function(e) {
                    e.filename = t,
                    r(arguments.length > 1 ? _.toArray(arguments) : e)
                }, function() {}, function() {
                    i(new Error("Resource was not found: " + e))
                }, t)
            }
            )
        }
        function a(e, t, n) {
            return e = e || [],
            i(e, t, n, o)
        }
        var s = e("22")
          , u = e("24")
          , c = e("7")
          , l = e("6")
          , h = e("8")
          , f = new THREE.LoadingManager
          , p = new THREE.ObjectLoader(f)
          , d = {}
          , v = r(new THREE.TextureLoader(f), d)
          , m = r(new c(1024,(!1),f), d)
          , g = r(new l(256,(!1),f), d)
          , T = {}
          , y = new h(f)
          , b = {
            environmentPath: "assets/environments",
            manager: f
        }
          , S = "";
        Object.defineProperty(b, "texturePath", {
            get: function() {
                return S
            },
            set: function(e) {
                S = e,
                p.setTexturePath(e)
            }
        }),
        b.loadScene = function(e, t) {
            return o(e, t, p)
        }
        ,
        b.loadOBJs = function(e, t) {
            return a(e, t, objLoader)
        }
        ,
        b.loadTextures = function(e, t) {
            return a(e, t || b.texturePath, v)
        }
        ,
        b.loadBRDFs = function(e, t) {
            return a(e, t, brdfLoader)
        }
        ,
        b.loadPanoramas = function(e, t) {
            return a(e, t || b.environmentPath, m)
        }
        ,
        b.loadSpecularCubemaps = function(e, t) {
            return a(e, t || b.environmentPath, g)
        }
        ,
        b.loadSH = function(e) {
            return s.all(_.map(e, function(e) {
                return new s(function(t, n) {
                    var r = u(b.environmentPath, e + "/irradiance.json");
                    y.load(r, function(n) {
                        T[e] = n,
                        t(n)
                    }, function() {}, function() {
                        n(new Error("Resource was not found: " + r))
                    })
                }
                )
            }))
        }
        ,
        b.getTexture = function(e) {
            return v.get(e)
        }
        ,
        b.getBRDF = function(e) {
            return brdfLoader.get(e)
        }
        ,
        b.getPanorama = function(e) {
            return m.get(e + "/panorama.bin")
        }
        ,
        b.getCubemap = function(e) {
            //return g.get(e + "/cubemap.bin")
        }
        ,
        b.getSH = function(e) {
            return T[e]
        }
        ,
        t.exports = b
    }
    , {
        22: 22,
        24: 24,
        6: 6,
        7: 7,
        8: 8
    }],
    12: [function(e, t, n) {
        var r = e("22");
        e("9");
        var i = e("11")
          , o = (e("19"),
        {});
        o.loadScene = function(e, t, n) {
            return new r(function(r, o) {
                var a = (new THREE.ObjectLoader(i.manager),
                t.renderer);
                i.loadScene("assets/scenes/" + e + (n || ".json")).spread(function(e, n) {
                    var i;
                    e.materials = {},
                    e.cameras && e.cameras.length > 0 && (i = e.cameras[0]),
                    i ? (i.aspect = window.innerWidth / window.innerHeight,
                    i.updateProjectionMatrix()) : (i = new THREE.PerspectiveCamera(50,window.innerWidth / window.innerHeight,.01,2e3),
                    i.position.set(-3.5, 2, 3)),
                    e.add(i);
                    var o = 10
                      , s = 1;
                    new THREE.GridHelper(o,s),
                    new THREE.AxisHelper(5);
                    e.traverse(function(e) {
                        e instanceof THREE.DirectionalLight && (e.position.set(0, 0, 1),
                        e.quaternion.normalize(),
                        e.position.applyQuaternion(e.quaternion),
                        e.quaternion.set(0, 0, 0, 0),
                        e.scale.set(0, 0, 0))
                    }),
                    mixer = new THREE.AnimationMixer(e);
                    for (var u = 0; u < e.animations.length; u++)
                        mixer.clipAction(e.animations[u]).play();
                    new THREE.TextureLoader;
                    e.traverse(function(e) {
                        var t = e.material;
                        t && t.aoMap && !t.map
                    }),
                    n.renderer && (a.shadowMap.enabled = n.renderer.shadowMapEnabled,
                    a.shadowMap.type = n.renderer.shadowMapType,
                    a.shadowMap.cullFace = n.renderer.shadowMapCullFace,
                    a.shadowMap.cascade = n.renderer.shadowMapCascade);
                    var c;
                    e.traverse(function(e) {
                        e instanceof THREE.DirectionalLight && (c = e.shadow.camera)
                    }),
                    c && a.shadowMap.enabled && (cameraHelper = new THREE.CameraHelper(c),
                    e.add(cameraHelper),
                    c.near = -30,
                    c.far = 30),
                    e.traverse(function(e) {
                        "Line" === e.name && (e.material.linewidth = 10,
                        e.material.color.setRGB(1, 0, 1))
                    }),
                    e.traverse(function(t) {
                        if (t instanceof THREE.SpotLight) {
                            var n = new THREE.Vector3(0,0,(-1))
                              , r = new THREE.Object3D;
                            t.updateMatrixWorld(),
                            t.localToWorld(n),
                            r.position.copy(n),
                            e.add(r),
                            t.target = r
                        }
                        t.material && (t.material.materials ? t.material.materials.forEach(function(t) {
                            e.materials[t.uuid] = t
                        }) : e.materials[t.material.uuid] = t.material)
                    }),
                    t.scene = e,
                    t.scenes.push(e),
                    t.camera = i,
                    r(e)
                })
            }
            )
        }
        ,
        t.exports = o
    }
    , {
        11: 11,
        19: 19,
        22: 22,
        9: 9
    }],
    13: [function(e, t, n) {
        TweenUtils = {},
        TweenUtils.tween = function(e, t) {
            var n = new TWEEN.Tween({
                progress: 0
            });
            return n.to({
                progress: 1
            }, e).easing(void 0 !== t ? t : TWEEN.Easing.Linear.None).start(),
            n
        }
        ,
        t.exports = TweenUtils
    }
    , {}],
    14: [function(e, t, n) {
        var r = {
            isLatestAvailable: function() {
                return void 0 !== navigator.getVRDisplays
            },
            isAvailable: function() {
                return void 0 !== navigator.getVRDisplays || void 0 !== navigator.getVRDevices
            },
            getMessage: function() {
                var e;
                if (navigator.getVRDisplays ? navigator.getVRDisplays().then(function(t) {
                    0 === t.length && (e = "WebVR supported, but no VRDisplays found.")
                }) : e = navigator.getVRDevices ? 'Your browser supports WebVR but not the latest version. See <a href="http://webvr.info">webvr.info</a> for more info.' : 'Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.',
                void 0 !== e) {
                    var t = document.createElement("div");
                    t.style.position = "absolute",
                    t.style.left = "0",
                    t.style.top = "0",
                    t.style.right = "0",
                    t.style.zIndex = "999",
                    t.align = "center";
                    var n = document.createElement("div");
                    return n.style.fontFamily = "sans-serif",
                    n.style.fontSize = "16px",
                    n.style.fontStyle = "normal",
                    n.style.lineHeight = "26px",
                    n.style.backgroundColor = "#fff",
                    n.style.color = "#000",
                    n.style.padding = "10px 20px",
                    n.style.margin = "50px",
                    n.style.display = "inline-block",
                    n.innerHTML = e,
                    t.appendChild(n),
                    t
                }
            },
            getButton: function(e) {
                var t = document.createElement("button");
                return t.style.position = "absolute",
                t.style.left = "calc(50% - 50px)",
                t.style.bottom = "20px",
                t.style.width = "100px",
                t.style.border = "0",
                t.style.padding = "8px",
                t.style.cursor = "pointer",
                t.style.backgroundColor = "#000",
                t.style.color = "#fff",
                t.style.fontFamily = "sans-serif",
                t.style.fontSize = "13px",
                t.style.fontStyle = "normal",
                t.style.textAlign = "center",
                t.style.zIndex = "999",
                t.textContent = "ENTER VR",
                t.onclick = function() {
                    e.isPresenting ? e.exitPresent() : e.requestPresent()
                }
                ,
                window.addEventListener("vrdisplaypresentchange", function(n) {
                    t.textContent = e.isPresenting ? "EXIT VR" : "ENTER VR"
                }, !1),
                t
            }
        };
        t.exports = r
    }
    , {}],
    15: [function(e, t, n) {
        e("16"),
        window._ = e("25"),
        Number.prototype.lerp = function(e, t) {
            return this + (e - this) * t
        }
        ,
        String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
            var n = this.toString();
            ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t > n.length) && (t = n.length),
            t -= e.length;
            var r = n.indexOf(e, t);
            return r !== -1 && r === t
        }
        ),
        Function.prototype.inherit = function(e, t) {
            if (!e || !_.isFunction(e))
                throw "parent argument must be a function";
            this.prototype = _.extend(Object.create(e.prototype), t)
        }
        ,
        Function.prototype.mixin = function(e) {
            _.each(e, function(e, t) {
                void 0 === this.prototype[t] && (this.prototype[t] = e)
            }, this)
        }
        ,
        window.isMobile = "ontouchstart"in window,
        window.WIDTH = window.innerWidth,
        window.HEIGHT = window.innerHeight,
        window.mouseX = 0,
        window.mouseY = 0,
        window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        window.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    }
    , {
        16: 16,
        25: 25
    }],
    16: [function(e, t, n) {
        void 0 === Date.now && (Date.now = function() {
            return (new Date).valueOf()
        }
        ),
        window.TWEEN = function() {
            var e = []
              , t = []
              , n = [];
            return {
                REVISION: "14",
                getAll: function() {
                    return e
                },
                removeAll: function() {
                    e = []
                },
                add: function(e) {
                    t.push(e)
                },
                remove: function(e) {
                    n.push(e)
                },
                update: function(r) {
                    var i = 0;
                    for (r = void 0 !== r ? r : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(); i < e.length; )
                        e[i].update(r) ? i++ : e.splice(i, 1);
                    return n.length > 0 && (n.forEach(function(t) {
                        var n = e.indexOf(t);
                        n !== -1 && e.splice(n, 1)
                    }),
                    n = []),
                    t.length > 0 && (t.forEach(function(t) {
                        e.push(t)
                    }),
                    t = []),
                    !0
                }
            }
        }(),
        TWEEN.Tween = function(e) {
            var t, n, r, i, o, a, s, u, c, l, h, f, p, d, v, _, m, g, T, y;
            this.reset = function(e) {
                return t = e,
                n = 0,
                r = {},
                i = {},
                o = {},
                a = 1e3,
                s = 0,
                u = !1,
                c = !1,
                l = !1,
                h = 0,
                f = null,
                p = TWEEN.Easing.Linear.None,
                d = TWEEN.Interpolation.Linear,
                v = [],
                _ = null,
                m = !1,
                g = null,
                T = null,
                y = null,
                this
            }
            ,
            this.to = function(e, t) {
                return void 0 !== t && (a = t),
                i = e,
                this
            }
            ,
            this.start = function(e) {
                TWEEN.add(this),
                c = !0,
                m = !1,
                f = void 0 !== e ? e : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(),
                f += h;
                for (var n in i)
                    r[n] = t[n],
                    o[n] = r[n] || 0;
                return this
            }
            ,
            this.stop = function() {
                return c ? (TWEEN.remove(this),
                c = !1,
                null !== y && y.call(t),
                this.stopChainedTweens(),
                this) : this
            }
            ,
            this.stopChainedTweens = function() {
                for (var e = 0, t = v.length; e < t; e++)
                    v[e].stop()
            }
            ,
            this.delay = function(e) {
                return h = e,
                this
            }
            ,
            this.repeat = function(e) {
                return s = e,
                this
            }
            ,
            this.yoyo = function(e) {
                return u = e,
                this
            }
            ,
            this.easing = function(e) {
                return p = e,
                this
            }
            ,
            this.interpolation = function(e) {
                return d = e,
                this
            }
            ,
            this.chain = function() {
                return v = arguments,
                this
            }
            ,
            this.onStart = function(e) {
                return _ = e,
                this
            }
            ,
            this.onUpdate = function(e) {
                return g = e,
                this
            }
            ,
            this.onComplete = function(e) {
                return T = e,
                this
            }
            ,
            this.onStop = function(e) {
                return y = e,
                this
            }
            ,
            this.update = function(e) {
                var o;
                if (e < f)
                    return !0;
                if (!c)
                    return !1;
                m === !1 && (null !== _ && _.call(t),
                m = !0);
                var s = (e - f) / a;
                s = s > 1 ? 1 : s,
                n = s;
                var u = p(s);
                for (o in i) {
                    var l = r[o] || 0
                      , h = i[o];
                    t[o] = l + (h - l) * u
                }
                if (null !== g && g.call(t, u),
                1 == s) {
                    null !== T && T.call(t);
                    for (var d = 0, y = v.length; d < y; d++)
                        v[d].start(e);
                    return !1
                }
                return !0
            }
            ,
            this.getProgress = function() {
                return n
            }
            ,
            void 0 !== e && this.reset(e)
        }
        ,
        TWEEN.Easing = {
            Linear: {
                None: function(e) {
                    return e
                }
            },
            Quadratic: {
                In: function(e) {
                    return e * e
                },
                Out: function(e) {
                    return e * (2 - e)
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
                }
            },
            Cubic: {
                In: function(e) {
                    return e * e * e
                },
                Out: function(e) {
                    return --e * e * e + 1
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
                }
            },
            Quartic: {
                In: function(e) {
                    return e * e * e * e
                },
                Out: function(e) {
                    return 1 - --e * e * e * e
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
                }
            },
            Quintic: {
                In: function(e) {
                    return e * e * e * e * e
                },
                Out: function(e) {
                    return --e * e * e * e * e + 1
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
                }
            },
            Sinusoidal: {
                In: function(e) {
                    return 1 - Math.cos(e * Math.PI / 2)
                },
                Out: function(e) {
                    return Math.sin(e * Math.PI / 2)
                },
                InOut: function(e) {
                    return .5 * (1 - Math.cos(Math.PI * e))
                }
            },
            Exponential: {
                In: function(e) {
                    return 0 === e ? 0 : Math.pow(1024, e - 1)
                },
                Out: function(e) {
                    return 1 === e ? 1 : 1 - Math.pow(2, -10 * e)
                },
                InOut: function(e) {
                    return 0 === e ? 0 : 1 === e ? 1 : (e *= 2) < 1 ? .5 * Math.pow(1024, e - 1) : .5 * (-Math.pow(2, -10 * (e - 1)) + 2)
                }
            },
            Circular: {
                In: function(e) {
                    return 1 - Math.sqrt(1 - e * e)
                },
                Out: function(e) {
                    return Math.sqrt(1 - --e * e)
                },
                InOut: function(e) {
                    return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                }
            },
            Elastic: {
                In: function(e) {
                    var t, n = .1, r = .4;
                    return 0 === e ? 0 : 1 === e ? 1 : (!n || n < 1 ? (n = 1,
                    t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI),
                    -(n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r)))
                },
                Out: function(e) {
                    var t, n = .1, r = .4;
                    return 0 === e ? 0 : 1 === e ? 1 : (!n || n < 1 ? (n = 1,
                    t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI),
                    n * Math.pow(2, -10 * e) * Math.sin((e - t) * (2 * Math.PI) / r) + 1)
                },
                InOut: function(e) {
                    var t, n = .1, r = .4;
                    return 0 === e ? 0 : 1 === e ? 1 : (!n || n < 1 ? (n = 1,
                    t = r / 4) : t = r * Math.asin(1 / n) / (2 * Math.PI),
                    (e *= 2) < 1 ? -.5 * (n * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r)) : n * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * (2 * Math.PI) / r) * .5 + 1)
                }
            },
            Back: {
                In: function(e) {
                    var t = 1.70158;
                    return e * e * ((t + 1) * e - t)
                },
                Out: function(e) {
                    var t = 1.70158;
                    return --e * e * ((t + 1) * e + t) + 1
                },
                InOut: function(e) {
                    var t = 2.5949095;
                    return (e *= 2) < 1 ? .5 * (e * e * ((t + 1) * e - t)) : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2)
                }
            },
            Bounce: {
                In: function(e) {
                    return 1 - TWEEN.Easing.Bounce.Out(1 - e)
                },
                Out: function(e) {
                    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                },
                InOut: function(e) {
                    return e < .5 ? .5 * TWEEN.Easing.Bounce.In(2 * e) : .5 * TWEEN.Easing.Bounce.Out(2 * e - 1) + .5
                }
            }
        },
        TWEEN.Interpolation = {
            Linear: function(e, t) {
                var n = e.length - 1
                  , r = n * t
                  , i = Math.floor(r)
                  , o = TWEEN.Interpolation.Utils.Linear;
                return t < 0 ? o(e[0], e[1], r) : t > 1 ? o(e[n], e[n - 1], n - r) : o(e[i], e[i + 1 > n ? n : i + 1], r - i)
            },
            Bezier: function(e, t) {
                var n, r = 0, i = e.length - 1, o = Math.pow, a = TWEEN.Interpolation.Utils.Bernstein;
                for (n = 0; n <= i; n++)
                    r += o(1 - t, i - n) * o(t, n) * e[n] * a(i, n);
                return r
            },
            CatmullRom: function(e, t) {
                var n = e.length - 1
                  , r = n * t
                  , i = Math.floor(r)
                  , o = TWEEN.Interpolation.Utils.CatmullRom;
                return e[0] === e[n] ? (t < 0 && (i = Math.floor(r = n * (1 + t))),
                o(e[(i - 1 + n) % n], e[i], e[(i + 1) % n], e[(i + 2) % n], r - i)) : t < 0 ? e[0] - (o(e[0], e[0], e[1], e[1], -r) - e[0]) : t > 1 ? e[n] - (o(e[n], e[n], e[n - 1], e[n - 1], r - n) - e[n]) : o(e[i ? i - 1 : 0], e[i], e[n < i + 1 ? n : i + 1], e[n < i + 2 ? n : i + 2], r - i)
            },
            Utils: {
                Linear: function(e, t, n) {
                    return (t - e) * n + e
                },
                Bernstein: function(e, t) {
                    var n = TWEEN.Interpolation.Utils.Factorial;
                    return n(e) / n(t) / n(e - t)
                },
                Factorial: function() {
                    var e = [1];
                    return function(t) {
                        var n, r = 1;
                        if (e[t])
                            return e[t];
                        for (n = t; n > 1; n--)
                            r *= n;
                        return e[t] = r
                    }
                }(),
                CatmullRom: function(e, t, n, r, i) {
                    var o = .5 * (n - e)
                      , a = .5 * (r - t)
                      , s = i * i
                      , u = i * s;
                    return (2 * t - 2 * n + o + a) * u + (-3 * t + 3 * n - 2 * o - a) * s + o * i + t
                }
            }
        },
        "undefined" != typeof t && t.exports && (t.exports = TWEEN)
    }
    , {}],
    17: [function(e, t, n) {
        function r(e, t) {
            return void 0 !== e ? e : t
        }
        var i = e("18")
          , o = e("11")
          , a = {
            normalMapFactor: "uNormalMapFactor",
            normalMap: "sTextureNormalMap",
            matcapMap: "sTextureAOMap"
        }
          , s = function(e) {
            e = Object.assign({
                vertexShader: e.vertexShader,
                fragmentShader: e.fragmentShader,
                uniforms: {
                    uNormalMapFactor: {
                        type: "f",
                        value: 1
                    },
                    sTextureMatcapMap: {
                        type: "t",
                        value: null
                    },
                    sTextureNormalMap: {
                        type: "t",
                        value: null
                    },
                    uFlipY: {
                        type: "i",
                        value: 0
                    },
                    uOutputLinear: {
                        type: "i",
                        value: 0
                    }
                }
            }, e),
            i.call(this, e),
            Object.keys(this.uniforms).forEach(function(e) {
                this.onPropertyChange(e, function(t) {
                    this.uniforms[e].value = t
                })
            }, this),
            _.each(a, function(e, t) {
                this.onPropertyChange(t, function(t) {
                    this[e] = t
                })
            }, this),
            this.extensions = {
                derivatives: !0
            }
        };
        s.inherit(i, {
            clone: function(e) {
                var t = e || new s;
                return i.prototype.clone.call(this, t),
                t.name = this.name,
                t.transparent = this.transparent,
                _.each(this.uniforms, function(e, n) {
                    var r = e.type;
                    "v2" === r || "m4" === r ? t.uniforms[n].value.copy(e.value) : t.uniforms[n].value = e.value
                }, this),
                t
            }
        }),
        s.create = function(e) {
            var t = new s;
            t.uuid = e.uuid,
            t.name = e.name,
            t.transparent = r(e.transparent, !1),
            t.polygonOffset = r(e.polygonOffset, !1),
            t.polygonOffsetUnits = r(e.polygonOffsetUnits, 0),
            t.polygonOffsetFactor = r(e.polygonOffsetFactor, 0);
            var n = (o.getTexture("white.png"),
            e.normalMap)
              , i = e.matcapMap;
            return t.uNormalMapFactor = r(e.normalMapFactor, 1),
            t.uFlipY = r(e.flipNormals, 0),
            t.side = r(e.side, THREE.FrontSide),
            n.needsUpdate = !0,
            i.needsUpdate = !0,
            t.sTextureNormalMap = n,
            t.sTextureMatcapMap = i,
            t
        }
        ,
        t.exports = s
    }
    , {
        11: 11,
        18: 18
    }],
    18: [function(e, t, n) {
        var r = ["side", "alphaTest", "transparent", "depthWrite", "shading", "wireframe"]
          , i = function(e) {
            e = e || {},
            THREE.ShaderMaterial.call(this, e),
            _.each(r, function(t) {
                var n = e[t];
                void 0 !== n && (this[t] = n)
            }, this)
        };
        i.inherit(THREE.ShaderMaterial, {
            onPropertyChange: function(e, t) {
                Object.defineProperty(this, e, {
                    get: function() {
                        return this["_" + e]
                    },
                    set: function(n) {
                        this["_" + e] = n,
                        t.call(this, n)
                    }
                })
            },
            clone: function(e) {
                var t = e || new i;
                return THREE.Material.prototype.clone.call(this, t),
                t.shading = this.shading,
                t.wireframe = this.wireframe,
                t.wireframeLinewidth = this.wireframeLinewidth,
                t.fog = this.fog,
                t.lights = this.lights,
                t.vertexColors = this.vertexColors,
                t.skinning = this.skinning,
                t.morphTargets = this.morphTargets,
                t.morphNormals = this.morphNormals,
                t
            }
        }),
        t.exports = i
    }
    , {}],
    19: [function(e, t, n) {
        function r(e, t) {
            return void 0 !== e ? e : t
        }
        var i = e("20")
          , o = e("11")
          , a = {
            aoFactor: "uAOPBRFactor",
            albedoFactor: "uAlbedoPBRFactor",
            glossFactor: "uGlossinessPBRFactor",
            metalFactor: "uMetalnessPBRFactor",
            opacity: "uOpacityFactor",
            normalMapFactor: "uNormalMapFactor",
            f0Factor: "uSpecularF0Factor",
            albedoMap: "sTextureAlbedoMap",
            normalMap: "sTextureNormalMap",
            normalMap2: "sTextureNormalMap2",
            aoMap: "sTextureAOMap",
            metalGlossMap: "sTexturePBRMaps",
            lightMap: "sTextureLightMap",
            cubemap: "sSpecularPBR",
            panorama: "sPanoramaPBR",
            sph: "uDiffuseSPH",
            exposure: "uEnvironmentExposure",
            transform: "uEnvironmentTransform",
            occludeSpecular: "uOccludeSpecular",
            alphaTest: "uAlphaTest",
            color: "uColor",
            contrast: "uContrast"
        }
          , s = function(e) {
            e = Object.assign({
                uniforms: {
                    uAOPBRFactor: {
                        type: "f",
                        value: 1
                    },
                    uAlbedoPBRFactor: {
                        type: "f",
                        value: 1
                    },
                    uGlossinessPBRFactor: {
                        type: "f",
                        value: 1
                    },
                    uMetalnessPBRFactor: {
                        type: "f",
                        value: 1
                    },
                    uNormalMapFactor: {
                        type: "f",
                        value: 1
                    },
                    uSpecularF0Factor: {
                        type: "f",
                        value: 1
                    },
                    uEnvironmentExposure: {
                        type: "f",
                        value: 1
                    },
                    uOpacityFactor: {
                        type: "f",
                        value: 1
                    },
                    sTextureAlbedoMap: {
                        type: "t",
                        value: null
                    },
                    sTextureNormalMap: {
                        type: "t",
                        value: null
                    },
                    sTextureNormalMap2: {
                        type: "t",
                        value: null
                    },
                    sTextureAOMap: {
                        type: "t",
                        value: null
                    },
                    sTexturePBRMaps: {
                        type: "t",
                        value: null
                    },
                    sTextureLightMap: {
                        type: "t",
                        value: null
                    },
                    sSpecularPBR: {
                        type: "t",
                        value: null
                    },
                    sPanoramaPBR: {
                        type: "t",
                        value: null
                    },
                    uTextureEnvironmentSpecularPBRLodRange: {
                        type: "v2",
                        value: new THREE.Vector2(10,5)
                    },
                    uTextureEnvironmentSpecularPBRTextureSize: {
                        type: "v2",
                        value: new THREE.Vector2
                    },
                    uDiffuseSPH: {
                        type: "3fv",
                        value: null
                    },
                    uFlipY: {
                        type: "i",
                        value: 0
                    },
                    uOccludeSpecular: {
                        type: "i",
                        value: 0
                    },
                    uOutputLinear: {
                        type: "i",
                        value: 0
                    },
                    uEnvironmentTransform: {
                        type: "m4",
                        value: new THREE.Matrix4
                    },
                    uColor: {
                        type: "c",
                        value: null
                    },
                    uAlphaTest: {
                        type: "f",
                        value: 0
                    },
                    uContrast: {
                        type: "f",
                        value: 1.2
                    },
                    offsetRepeat: {
                        type: "v4",
                        value: new THREE.Vector4(0,0,1,1)
                    }
                }
            }, e),
            i.call(this, e),
            Object.keys(this.uniforms).forEach(function(e) {
                this.onPropertyChange(e, function(t) {
                    this.uniforms[e].value = t
                })
            }, this),
            _.each(a, function(e, t) {
                this.onPropertyChange(t, function(t) {
                    this[e] = t
                })
            }, this),
            this.extensions = {
                derivatives: !0,
                shaderTextureLOD: null !== THREE.Extensions.get("EXT_shader_texture_lod")
            },
            this.pbr = !0
        };
        s.inherit(i, {
            _clone: function(e) {
                var t = e || new s;
                return i.prototype.clone.call(this, t),
                t.name = this.name,
                t.transparent = this.transparent,
                _.each(this.uniforms, function(e, n) {
                    var r = e.type;
                    "v2" === r || "m4" === r ? t.uniforms[n].value.copy(e.value) : t.uniforms[n].value = e.value
                }, this),
                t
            },
            clone: function() {
                var e = s.create(this.createOptions);
                return e.uuid = THREE.Math.generateUUID(),
                e
            },
            updateEnvironmentTransform: function() {
                var e = new THREE.Quaternion;
                return function(t) {
                    t.getWorldQuaternion(e).inverse(),
                    this.uniforms.uEnvironmentTransform.value.makeRotationFromQuaternion(e)
                }
            }(),
            refreshOffsetRepeat: function() {
                var e;
                if (this.defines.USE_ALBEDOMAP ? e = this.sTextureAlbedoMap : this.defines.USE_NORMALMAP ? e = this.sTextureNormalMap : this.defines.USE_AOMAP && (e = this.sTextureAOMap),
                void 0 !== e) {
                    var t = e.offset
                      , n = e.repeat;
                    this.uniforms.offsetRepeat.value.set(t.x, t.y, n.x, n.y)
                }
            },
            refreshUniforms: function(e) {
                this.updateEnvironmentTransform(e)
            }
        }),
        s.create = function(e) {
            var t = new s({
                vertexShader: e.vertexShader,
                fragmentShader: e.fragmentShader
            });
            t.createOptions = e,
            t.uuid = e.uuid,
            t.name = e.name,
            t.transparent = r(e.transparent, !1),
            t.polygonOffset = r(e.polygonOffset, !1),
            t.polygonOffsetUnits = r(e.polygonOffsetUnits, 0),
            t.polygonOffsetFactor = r(e.polygonOffsetFactor, 0);
            var n, i, a = o.getTexture("textures/white.png"), u = e.albedoMap || a, c = e.normalMap || a, l = e.normalMap2 || a, h = e.aoMap || a, f = e.metalGlossMap || a, p = e.lightMap || a, d = o.getSH(e.environment);
            return t.extensions.shaderTextureLOD ? n = o.getCubemap(e.environment) : i = o.getPanorama(e.environment),
            e.normalMap && (t.defines.USE_NORMALMAP = !0),
            e.normalMap2 && (t.defines.USE_NORMALMAP2 = !0),
            e.aoMap && (t.defines.USE_AOMAP = !0),
            e.lightMap && (t.defines.USE_LIGHTMAP = !0),
            e.albedoMap && (t.defines.USE_ALBEDOMAP = !0),
            t.uAlbedoPBRFactor = r(e.albedoFactor, 1),
            t.uNormalMapFactor = r(e.normalMapFactor, 1),
            t.uMetalnessPBRFactor = r(e.metalFactor, 1),
            t.uGlossinessPBRFactor = r(e.glossFactor, 1),
            t.uAOPBRFactor = r(e.aoFactor, 1),
            t.uSpecularF0Factor = r(e.f0Factor, .5),
            t.uEnvironmentExposure = r(e.exposure, 1),
            t.occludeSpecular = r(e.occludeSpecular ? 1 : 0, 1),
            t.uFlipY = r(e.flipNormals, 0),
            t.opacity = r(e.opacity, 1),
            t.color = (new THREE.Color).setHex(e.color),
            t.side = r(e.side, THREE.FrontSide),
            u.needsUpdate = !0,
            c.needsUpdate = !0,
            l.needsUpdate = !0,
            h.needsUpdate = !0,
            f.needsUpdate = !0,
            p.needsUpdate = !0,
            n && (n.needsUpdate = !0),
            i && (i.needsUpdate = !0),
            t.sTextureAlbedoMap = u,
            t.sTextureNormalMap = c,
            t.sTextureNormalMap2 = l,
            t.sTextureAOMap = h,
            t.sTexturePBRMaps = f,
            t.sTextureLightMap = p,
            t.sSpecularPBR = n,
            t.sPanoramaPBR = i,
            d && (t.uDiffuseSPH = new Float32Array(d,27)),
            t.uEnvironmentTransform = new THREE.Matrix4,
            e.alphaTest && (t.alphaTest = e.alphaTest,
            t.defines.ALPHATEST = !0),
            t.extensions.shaderTextureLOD ? (t.defines.CUBEMAP = !0,
            t.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(256, 256)) : (t.defines.PANORAMA = !0,
            t.uniforms.uTextureEnvironmentSpecularPBRTextureSize.value.set(1024, 1024)),
            t.refreshOffsetRepeat(),
            t
        }
        ,
        t.exports = s
    }
    , {
        11: 11,
        20: 20
    }],
    20: [function(e, t, n) {
        var r = ["side", "alphaTest", "transparent", "depthWrite", "shading", "wireframe"]
          , i = function(e) {
            e = e || {},
            THREE.RawShaderMaterial.call(this, e),
            _.each(r, function(t) {
                var n = e[t];
                void 0 !== n && (this[t] = n)
            }, this)
        };
        i.inherit(THREE.RawShaderMaterial, {
            onPropertyChange: function(e, t) {
                Object.defineProperty(this, e, {
                    get: function() {
                        return this["_" + e]
                    },
                    set: function(n) {
                        this["_" + e] = n,
                        t.call(this, n)
                    }
                })
            },
            clone: function(e) {
                var t = e || new Material;
                return THREE.RawShaderMaterial.prototype.clone.call(this, t),
                t.shading = this.shading,
                t.wireframe = this.wireframe,
                t.wireframeLinewidth = this.wireframeLinewidth,
                t.fog = this.fog,
                t.lights = this.lights,
                t.vertexColors = this.vertexColors,
                t.skinning = this.skinning,
                t.morphTargets = this.morphTargets,
                t.morphNormals = this.morphNormals,
                t
            }
        }),
        t.exports = i
    }
    , {}],
    21: [function(e, t, n) {
        function r(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        }
        function i(e) {
            return "[object Arguments]" === Object.prototype.toString.call(e)
        }
        function o(e) {
            return Object.keys(e).map(function(t) {
                return e[t]
            })
        }
        t.exports = function(e, t) {
            return e || (e = []),
            i(e) && (e = [].splice.call(e, 0)),
            r(e) && t && (e = o(e)),
            Array.isArray(e) ? e : [e]
        }
    }
    , {}],
    22: [function(e, t, n) {
        (function(e, r) {
            !function(e) {
                if ("object" == typeof n && "undefined" != typeof t)
                    t.exports = e();
                else if ("function" == typeof define && define.amd)
                    define([], e);
                else {
                    var i;
                    "undefined" != typeof window ? i = window : "undefined" != typeof r ? i = r : "undefined" != typeof self && (i = self),
                    i.Promise = e()
                }
            }(function() {
                var t, n, i;
                return function o(e, t, n) {
                    function r(a, s) {
                        if (!t[a]) {
                            if (!e[a]) {
                                var u = "function" == typeof _dereq_ && _dereq_;
                                if (!s && u)
                                    return u(a, !0);
                                if (i)
                                    return i(a, !0);
                                var c = new Error("Cannot find module '" + a + "'");
                                throw c.code = "MODULE_NOT_FOUND",
                                c
                            }
                            var l = t[a] = {
                                exports: {}
                            };
                            e[a][0].call(l.exports, function(t) {
                                var n = e[a][1][t];
                                return r(n ? n : t)
                            }, l, l.exports, o, e, t, n)
                        }
                        return t[a].exports
                    }
                    for (var i = "function" == typeof _dereq_ && _dereq_, a = 0; a < n.length; a++)
                        r(n[a]);
                    return r
                }({
                    1: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            function t(e) {
                                var t = new n(e)
                                  , r = t.promise();
                                return t.setHowMany(1),
                                t.setUnwrap(),
                                t.init(),
                                r
                            }
                            var n = e._SomePromiseArray;
                            e.any = function(e) {
                                return t(e)
                            }
                            ,
                            e.prototype.any = function() {
                                return t(this)
                            }
                        }
                    }
                    , {}],
                    2: [function(t, n, r) {
                        "use strict";
                        function i() {
                            this._customScheduler = !1,
                            this._isTickUsed = !1,
                            this._lateQueue = new h(16),
                            this._normalQueue = new h(16),
                            this._haveDrainedQueues = !1,
                            this._trampolineEnabled = !0;
                            var e = this;
                            this.drainQueues = function() {
                                e._drainQueues()
                            }
                            ,
                            this._schedule = l
                        }
                        function o(e, t, n) {
                            this._lateQueue.push(e, t, n),
                            this._queueTick()
                        }
                        function a(e, t, n) {
                            this._normalQueue.push(e, t, n),
                            this._queueTick()
                        }
                        function s(e) {
                            this._normalQueue._pushOne(e),
                            this._queueTick()
                        }
                        var u;
                        try {
                            throw new Error
                        } catch (c) {
                            u = c
                        }
                        var l = t("./schedule")
                          , h = t("./queue")
                          , f = t("./util");
                        i.prototype.setScheduler = function(e) {
                            var t = this._schedule;
                            return this._schedule = e,
                            this._customScheduler = !0,
                            t
                        }
                        ,
                        i.prototype.hasCustomScheduler = function() {
                            return this._customScheduler
                        }
                        ,
                        i.prototype.enableTrampoline = function() {
                            this._trampolineEnabled = !0
                        }
                        ,
                        i.prototype.disableTrampolineIfNecessary = function() {
                            f.hasDevTools && (this._trampolineEnabled = !1)
                        }
                        ,
                        i.prototype.haveItemsQueued = function() {
                            return this._isTickUsed || this._haveDrainedQueues
                        }
                        ,
                        i.prototype.fatalError = function(t, n) {
                            n ? (e.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"),
                            e.exit(2)) : this.throwLater(t)
                        }
                        ,
                        i.prototype.throwLater = function(e, t) {
                            if (1 === arguments.length && (t = e,
                            e = function() {
                                throw t
                            }
                            ),
                            "undefined" != typeof setTimeout)
                                setTimeout(function() {
                                    e(t)
                                }, 0);
                            else
                                try {
                                    this._schedule(function() {
                                        e(t)
                                    })
                                } catch (n) {
                                    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
                                }
                        }
                        ,
                        f.hasDevTools ? (i.prototype.invokeLater = function(e, t, n) {
                            this._trampolineEnabled ? o.call(this, e, t, n) : this._schedule(function() {
                                setTimeout(function() {
                                    e.call(t, n)
                                }, 100)
                            })
                        }
                        ,
                        i.prototype.invoke = function(e, t, n) {
                            this._trampolineEnabled ? a.call(this, e, t, n) : this._schedule(function() {
                                e.call(t, n)
                            })
                        }
                        ,
                        i.prototype.settlePromises = function(e) {
                            this._trampolineEnabled ? s.call(this, e) : this._schedule(function() {
                                e._settlePromises()
                            })
                        }
                        ) : (i.prototype.invokeLater = o,
                        i.prototype.invoke = a,
                        i.prototype.settlePromises = s),
                        i.prototype.invokeFirst = function(e, t, n) {
                            this._normalQueue.unshift(e, t, n),
                            this._queueTick()
                        }
                        ,
                        i.prototype._drainQueue = function(e) {
                            for (; e.length() > 0; ) {
                                var t = e.shift();
                                if ("function" == typeof t) {
                                    var n = e.shift()
                                      , r = e.shift();
                                    t.call(n, r)
                                } else
                                    t._settlePromises()
                            }
                        }
                        ,
                        i.prototype._drainQueues = function() {
                            this._drainQueue(this._normalQueue),
                            this._reset(),
                            this._haveDrainedQueues = !0,
                            this._drainQueue(this._lateQueue)
                        }
                        ,
                        i.prototype._queueTick = function() {
                            this._isTickUsed || (this._isTickUsed = !0,
                            this._schedule(this.drainQueues))
                        }
                        ,
                        i.prototype._reset = function() {
                            this._isTickUsed = !1
                        }
                        ,
                        n.exports = i,
                        n.exports.firstLineError = u
                    }
                    , {
                        "./queue": 26,
                        "./schedule": 29,
                        "./util": 36
                    }],
                    3: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e, t, n, r) {
                            var i = !1
                              , o = function(e, t) {
                                this._reject(t)
                            }
                              , a = function(e, t) {
                                t.promiseRejectionQueued = !0,
                                t.bindingPromise._then(o, o, null, this, e)
                            }
                              , s = function(e, t) {
                                0 === (50397184 & this._bitField) && this._resolveCallback(t.target)
                            }
                              , u = function(e, t) {
                                t.promiseRejectionQueued || this._reject(e)
                            };
                            e.prototype.bind = function(o) {
                                i || (i = !0,
                                e.prototype._propagateFrom = r.propagateFromFunction(),
                                e.prototype._boundValue = r.boundValueFunction());
                                var c = n(o)
                                  , l = new e(t);
                                l._propagateFrom(this, 1);
                                var h = this._target();
                                if (l._setBoundTo(c),
                                c instanceof e) {
                                    var f = {
                                        promiseRejectionQueued: !1,
                                        promise: l,
                                        target: h,
                                        bindingPromise: c
                                    };
                                    h._then(t, a, void 0, l, f),
                                    c._then(s, u, void 0, l, f),
                                    l._setOnCancel(c)
                                } else
                                    l._resolveCallback(h);
                                return l
                            }
                            ,
                            e.prototype._setBoundTo = function(e) {
                                void 0 !== e ? (this._bitField = 2097152 | this._bitField,
                                this._boundTo = e) : this._bitField = this._bitField & -2097153
                            }
                            ,
                            e.prototype._isBound = function() {
                                return 2097152 === (2097152 & this._bitField)
                            }
                            ,
                            e.bind = function(t, n) {
                                return e.resolve(n).bind(t)
                            }
                        }
                    }
                    , {}],
                    4: [function(e, t, n) {
                        "use strict";
                        function r() {
                            try {
                                Promise === o && (Promise = i)
                            } catch (e) {}
                            return o
                        }
                        var i;
                        "undefined" != typeof Promise && (i = Promise);
                        var o = e("./promise")();
                        o.noConflict = r,
                        t.exports = o
                    }
                    , {
                        "./promise": 22
                    }],
                    5: [function(e, t, n) {
                        "use strict";
                        var r = Object.create;
                        if (r) {
                            var i = r(null)
                              , o = r(null);
                            i[" size"] = o[" size"] = 0
                        }
                        t.exports = function(t) {
                            function n(e, n) {
                                var r;
                                if (null != e && (r = e[n]),
                                "function" != typeof r) {
                                    var i = "Object " + s.classString(e) + " has no method '" + s.toString(n) + "'";
                                    throw new t.TypeError(i)
                                }
                                return r
                            }
                            function r(e) {
                                var t = this.pop()
                                  , r = n(e, t);
                                return r.apply(e, this)
                            }
                            function i(e) {
                                return e[this]
                            }
                            function o(e) {
                                var t = +this;
                                return t < 0 && (t = Math.max(0, t + e.length)),
                                e[t]
                            }
                            var a, s = e("./util"), u = s.canEvaluate;
                            s.isIdentifier;
                            t.prototype.call = function(e) {
                                var t = [].slice.call(arguments, 1);
                                return t.push(e),
                                this._then(r, void 0, void 0, t, void 0)
                            }
                            ,
                            t.prototype.get = function(e) {
                                var t, n = "number" == typeof e;
                                if (n)
                                    t = o;
                                else if (u) {
                                    var r = a(e);
                                    t = null !== r ? r : i
                                } else
                                    t = i;
                                return this._then(t, void 0, void 0, e, void 0)
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    6: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i) {
                            var o = e("./util")
                              , a = o.tryCatch
                              , s = o.errorObj
                              , u = t._async;
                            t.prototype["break"] = t.prototype.cancel = function() {
                                if (!i.cancellation())
                                    return this._warn("cancellation is disabled");
                                for (var e = this, t = e; e._isCancellable(); ) {
                                    if (!e._cancelBy(t)) {
                                        t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                                        break
                                    }
                                    var n = e._cancellationParent;
                                    if (null == n || !n._isCancellable()) {
                                        e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                                        break
                                    }
                                    e._isFollowing() && e._followee().cancel(),
                                    e._setWillBeCancelled(),
                                    t = e,
                                    e = n
                                }
                            }
                            ,
                            t.prototype._branchHasCancelled = function() {
                                this._branchesRemainingToCancel--
                            }
                            ,
                            t.prototype._enoughBranchesHaveCancelled = function() {
                                return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0
                            }
                            ,
                            t.prototype._cancelBy = function(e) {
                                return e === this ? (this._branchesRemainingToCancel = 0,
                                this._invokeOnCancel(),
                                !0) : (this._branchHasCancelled(),
                                !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(),
                                !0))
                            }
                            ,
                            t.prototype._cancelBranched = function() {
                                this._enoughBranchesHaveCancelled() && this._cancel()
                            }
                            ,
                            t.prototype._cancel = function() {
                                this._isCancellable() && (this._setCancelled(),
                                u.invoke(this._cancelPromises, this, void 0))
                            }
                            ,
                            t.prototype._cancelPromises = function() {
                                this._length() > 0 && this._settlePromises()
                            }
                            ,
                            t.prototype._unsetOnCancel = function() {
                                this._onCancelField = void 0
                            }
                            ,
                            t.prototype._isCancellable = function() {
                                return this.isPending() && !this._isCancelled()
                            }
                            ,
                            t.prototype.isCancellable = function() {
                                return this.isPending() && !this.isCancelled()
                            }
                            ,
                            t.prototype._doInvokeOnCancel = function(e, t) {
                                if (o.isArray(e))
                                    for (var n = 0; n < e.length; ++n)
                                        this._doInvokeOnCancel(e[n], t);
                                else if (void 0 !== e)
                                    if ("function" == typeof e) {
                                        if (!t) {
                                            var r = a(e).call(this._boundValue());
                                            r === s && (this._attachExtraTrace(r.e),
                                            u.throwLater(r.e))
                                        }
                                    } else
                                        e._resultCancelled(this)
                            }
                            ,
                            t.prototype._invokeOnCancel = function() {
                                var e = this._onCancel();
                                this._unsetOnCancel(),
                                u.invoke(this._doInvokeOnCancel, this, e)
                            }
                            ,
                            t.prototype._invokeInternalOnCancel = function() {
                                this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0),
                                this._unsetOnCancel())
                            }
                            ,
                            t.prototype._resultCancelled = function() {
                                this.cancel()
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    7: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t) {
                            function n(e, n, s) {
                                return function(u) {
                                    var c = s._boundValue();
                                    e: for (var l = 0; l < e.length; ++l) {
                                        var h = e[l];
                                        if (h === Error || null != h && h.prototype instanceof Error) {
                                            if (u instanceof h)
                                                return o(n).call(c, u)
                                        } else if ("function" == typeof h) {
                                            var f = o(h).call(c, u);
                                            if (f === a)
                                                return f;
                                            if (f)
                                                return o(n).call(c, u)
                                        } else if (r.isObject(u)) {
                                            for (var p = i(h), d = 0; d < p.length; ++d) {
                                                var v = p[d];
                                                if (h[v] != u[v])
                                                    continue e
                                            }
                                            return o(n).call(c, u)
                                        }
                                    }
                                    return t
                                }
                            }
                            var r = e("./util")
                              , i = e("./es5").keys
                              , o = r.tryCatch
                              , a = r.errorObj;
                            return n
                        }
                    }
                    , {
                        "./es5": 13,
                        "./util": 36
                    }],
                    8: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            function t() {
                                this._trace = new t.CapturedTrace(r())
                            }
                            function n() {
                                if (i)
                                    return new t
                            }
                            function r() {
                                var e = o.length - 1;
                                if (e >= 0)
                                    return o[e]
                            }
                            var i = !1
                              , o = [];
                            return e.prototype._promiseCreated = function() {}
                            ,
                            e.prototype._pushContext = function() {}
                            ,
                            e.prototype._popContext = function() {
                                return null
                            }
                            ,
                            e._peekContext = e.prototype._peekContext = function() {}
                            ,
                            t.prototype._pushContext = function() {
                                void 0 !== this._trace && (this._trace._promiseCreated = null,
                                o.push(this._trace))
                            }
                            ,
                            t.prototype._popContext = function() {
                                if (void 0 !== this._trace) {
                                    var e = o.pop()
                                      , t = e._promiseCreated;
                                    return e._promiseCreated = null,
                                    t
                                }
                                return null
                            }
                            ,
                            t.CapturedTrace = null,
                            t.create = n,
                            t.deactivateLongStackTraces = function() {}
                            ,
                            t.activateLongStackTraces = function() {
                                var n = e.prototype._pushContext
                                  , o = e.prototype._popContext
                                  , a = e._peekContext
                                  , s = e.prototype._peekContext
                                  , u = e.prototype._promiseCreated;
                                t.deactivateLongStackTraces = function() {
                                    e.prototype._pushContext = n,
                                    e.prototype._popContext = o,
                                    e._peekContext = a,
                                    e.prototype._peekContext = s,
                                    e.prototype._promiseCreated = u,
                                    i = !1
                                }
                                ,
                                i = !0,
                                e.prototype._pushContext = t.prototype._pushContext,
                                e.prototype._popContext = t.prototype._popContext,
                                e._peekContext = e.prototype._peekContext = r,
                                e.prototype._promiseCreated = function() {
                                    var e = this._peekContext();
                                    e && null == e._promiseCreated && (e._promiseCreated = this)
                                }
                            }
                            ,
                            t
                        }
                    }
                    , {}],
                    9: [function(t, n, r) {
                        "use strict";
                        n.exports = function(n, r) {
                            function i(e, t) {
                                return {
                                    promise: t
                                }
                            }
                            function o() {
                                return !1
                            }
                            function a(e, t, n) {
                                var r = this;
                                try {
                                    e(t, n, function(e) {
                                        if ("function" != typeof e)
                                            throw new TypeError("onCancel must be a function, got: " + N.toString(e));
                                        r._attachCancellationCallback(e)
                                    })
                                } catch (i) {
                                    return i
                                }
                            }
                            function s(e) {
                                if (!this._isCancellable())
                                    return this;
                                var t = this._onCancel();
                                void 0 !== t ? N.isArray(t) ? t.push(e) : this._setOnCancel([t, e]) : this._setOnCancel(e)
                            }
                            function u() {
                                return this._onCancelField
                            }
                            function c(e) {
                                this._onCancelField = e
                            }
                            function l() {
                                this._cancellationParent = void 0,
                                this._onCancelField = void 0
                            }
                            function h(e, t) {
                                if (0 !== (1 & t)) {
                                    this._cancellationParent = e;
                                    var n = e._branchesRemainingToCancel;
                                    void 0 === n && (n = 0),
                                    e._branchesRemainingToCancel = n + 1
                                }
                                0 !== (2 & t) && e._isBound() && this._setBoundTo(e._boundTo)
                            }
                            function f(e, t) {
                                0 !== (2 & t) && e._isBound() && this._setBoundTo(e._boundTo)
                            }
                            function p() {
                                var e = this._boundTo;
                                return void 0 !== e && e instanceof n ? e.isFulfilled() ? e.value() : void 0 : e
                            }
                            function d() {
                                this._trace = new j(this._peekContext())
                            }
                            function v(e, t) {
                                if (F(e)) {
                                    var n = this._trace;
                                    if (void 0 !== n && t && (n = n._parent),
                                    void 0 !== n)
                                        n.attachExtraTrace(e);
                                    else if (!e.__stackCleaned__) {
                                        var r = E(e);
                                        N.notEnumerableProp(e, "stack", r.message + "\n" + r.stack.join("\n")),
                                        N.notEnumerableProp(e, "__stackCleaned__", !0)
                                    }
                                }
                            }
                            function _(e, t, n, r, i) {
                                if (void 0 === e && null !== t && Q) {
                                    if (void 0 !== i && i._returnedNonUndefined())
                                        return;
                                    if (0 === (65535 & r._bitField))
                                        return;
                                    n && (n += " ");
                                    var o = ""
                                      , a = "";
                                    if (t._trace) {
                                        for (var s = t._trace.stack.split("\n"), u = S(s), c = u.length - 1; c >= 0; --c) {
                                            var l = u[c];
                                            if (!V.test(l)) {
                                                var h = l.match(U);
                                                h && (o = "at " + h[1] + ":" + h[2] + ":" + h[3] + " ");
                                                break
                                            }
                                        }
                                        if (u.length > 0)
                                            for (var f = u[0], c = 0; c < s.length; ++c)
                                                if (s[c] === f) {
                                                    c > 0 && (a = "\n" + s[c - 1]);
                                                    break
                                                }
                                    }
                                    var p = "a promise was created in a " + n + "handler " + o + "but was not returned from it, see http://goo.gl/rRqMUw" + a;
                                    r._warn(p, !0, t)
                                }
                            }
                            function m(e, t) {
                                var n = e + " is deprecated and will be removed in a future version.";
                                return t && (n += " Use " + t + " instead."),
                                g(n)
                            }
                            function g(e, t, r) {
                                if (ae.warnings) {
                                    var i, o = new D(e);
                                    if (t)
                                        r._attachExtraTrace(o);
                                    else if (ae.longStackTraces && (i = n._peekContext()))
                                        i.attachExtraTrace(o);
                                    else {
                                        var a = E(o);
                                        o.stack = a.message + "\n" + a.stack.join("\n")
                                    }
                                    te("warning", o) || A(o, "", !0)
                                }
                            }
                            function T(e, t) {
                                for (var n = 0; n < t.length - 1; ++n)
                                    t[n].push("From previous event:"),
                                    t[n] = t[n].join("\n");
                                return n < t.length && (t[n] = t[n].join("\n")),
                                e + "\n" + t.join("\n")
                            }
                            function y(e) {
                                for (var t = 0; t < e.length; ++t)
                                    (0 === e[t].length || t + 1 < e.length && e[t][0] === e[t + 1][0]) && (e.splice(t, 1),
                                    t--)
                            }
                            function b(e) {
                                for (var t = e[0], n = 1; n < e.length; ++n) {
                                    for (var r = e[n], i = t.length - 1, o = t[i], a = -1, s = r.length - 1; s >= 0; --s)
                                        if (r[s] === o) {
                                            a = s;
                                            break
                                        }
                                    for (var s = a; s >= 0; --s) {
                                        var u = r[s];
                                        if (t[i] !== u)
                                            break;
                                        t.pop(),
                                        i--
                                    }
                                    t = r
                                }
                            }
                            function S(e) {
                                for (var t = [], n = 0; n < e.length; ++n) {
                                    var r = e[n]
                                      , i = "    (No stack trace)" === r || W.test(r)
                                      , o = i && re(r);
                                    i && !o && (z && " " !== r.charAt(0) && (r = "    " + r),
                                    t.push(r))
                                }
                                return t
                            }
                            function P(e) {
                                for (var t = e.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < t.length; ++n) {
                                    var r = t[n];
                                    if ("    (No stack trace)" === r || W.test(r))
                                        break
                                }
                                return n > 0 && (t = t.slice(n)),
                                t
                            }
                            function E(e) {
                                var t = e.stack
                                  , n = e.toString();
                                return t = "string" == typeof t && t.length > 0 ? P(e) : ["    (No stack trace)"],
                                {
                                    message: n,
                                    stack: S(t)
                                }
                            }
                            function A(e, t, n) {
                                if ("undefined" != typeof console) {
                                    var r;
                                    if (N.isObject(e)) {
                                        var i = e.stack;
                                        r = t + X(i, e)
                                    } else
                                        r = t + String(e);
                                    "function" == typeof O ? O(r, n) : "function" != typeof console.log && "object" != typeof console.log || console.log(r)
                                }
                            }
                            function w(e, t, n, r) {
                                var i = !1;
                                try {
                                    "function" == typeof t && (i = !0,
                                    "rejectionHandled" === e ? t(r) : t(n, r))
                                } catch (o) {
                                    B.throwLater(o)
                                }
                                "unhandledRejection" === e ? te(e, n, r) || i || A(n, "Unhandled rejection ") : te(e, r)
                            }
                            function M(e) {
                                var t;
                                if ("function" == typeof e)
                                    t = "[function " + (e.name || "anonymous") + "]";
                                else {
                                    t = e && "function" == typeof e.toString ? e.toString() : N.toString(e);
                                    var n = /\[object [a-zA-Z0-9$_]+\]/;
                                    if (n.test(t))
                                        try {
                                            var r = JSON.stringify(e);
                                            t = r
                                        } catch (i) {}
                                    0 === t.length && (t = "(empty array)")
                                }
                                return "(<" + x(t) + ">, no stack trace)"
                            }
                            function x(e) {
                                var t = 41;
                                return e.length < t ? e : e.substr(0, t - 3) + "..."
                            }
                            function C() {
                                return "function" == typeof oe
                            }
                            function R(e) {
                                var t = e.match(ie);
                                if (t)
                                    return {
                                        fileName: t[1],
                                        line: parseInt(t[2], 10)
                                    }
                            }
                            function H(e, t) {
                                if (C()) {
                                    for (var n, r, i = e.stack.split("\n"), o = t.stack.split("\n"), a = -1, s = -1, u = 0; u < i.length; ++u) {
                                        var c = R(i[u]);
                                        if (c) {
                                            n = c.fileName,
                                            a = c.line;
                                            break
                                        }
                                    }
                                    for (var u = 0; u < o.length; ++u) {
                                        var c = R(o[u]);
                                        if (c) {
                                            r = c.fileName,
                                            s = c.line;
                                            break
                                        }
                                    }
                                    a < 0 || s < 0 || !n || !r || n !== r || a >= s || (re = function(e) {
                                        if (k.test(e))
                                            return !0;
                                        var t = R(e);
                                        return !!(t && t.fileName === n && a <= t.line && t.line <= s)
                                    }
                                    )
                                }
                            }
                            function j(e) {
                                this._parent = e,
                                this._promisesCreated = 0;
                                var t = this._length = 1 + (void 0 === e ? 0 : e._length);
                                oe(this, j),
                                t > 32 && this.uncycle()
                            }
                            var L, G, O, I = n._getDomain, B = n._async, D = t("./errors").Warning, N = t("./util"), F = N.canAttachTrace, k = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/, V = /\((?:timers\.js):\d+:\d+\)/, U = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/, W = null, X = null, z = !1, q = !(0 == N.env("BLUEBIRD_DEBUG")), K = !(0 == N.env("BLUEBIRD_WARNINGS") || !q && !N.env("BLUEBIRD_WARNINGS")), Y = !(0 == N.env("BLUEBIRD_LONG_STACK_TRACES") || !q && !N.env("BLUEBIRD_LONG_STACK_TRACES")), Q = 0 != N.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (K || !!N.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
                            n.prototype.suppressUnhandledRejections = function() {
                                var e = this._target();
                                e._bitField = e._bitField & -1048577 | 524288
                            }
                            ,
                            n.prototype._ensurePossibleRejectionHandled = function() {
                                0 === (524288 & this._bitField) && (this._setRejectionIsUnhandled(),
                                B.invokeLater(this._notifyUnhandledRejection, this, void 0))
                            }
                            ,
                            n.prototype._notifyUnhandledRejectionIsHandled = function() {
                                w("rejectionHandled", L, void 0, this)
                            }
                            ,
                            n.prototype._setReturnedNonUndefined = function() {
                                this._bitField = 268435456 | this._bitField
                            }
                            ,
                            n.prototype._returnedNonUndefined = function() {
                                return 0 !== (268435456 & this._bitField)
                            }
                            ,
                            n.prototype._notifyUnhandledRejection = function() {
                                if (this._isRejectionUnhandled()) {
                                    var e = this._settledValue();
                                    this._setUnhandledRejectionIsNotified(),
                                    w("unhandledRejection", G, e, this)
                                }
                            }
                            ,
                            n.prototype._setUnhandledRejectionIsNotified = function() {
                                this._bitField = 262144 | this._bitField
                            }
                            ,
                            n.prototype._unsetUnhandledRejectionIsNotified = function() {
                                this._bitField = this._bitField & -262145
                            }
                            ,
                            n.prototype._isUnhandledRejectionNotified = function() {
                                return (262144 & this._bitField) > 0
                            }
                            ,
                            n.prototype._setRejectionIsUnhandled = function() {
                                this._bitField = 1048576 | this._bitField
                            }
                            ,
                            n.prototype._unsetRejectionIsUnhandled = function() {
                                this._bitField = this._bitField & -1048577,
                                this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(),
                                this._notifyUnhandledRejectionIsHandled())
                            }
                            ,
                            n.prototype._isRejectionUnhandled = function() {
                                return (1048576 & this._bitField) > 0
                            }
                            ,
                            n.prototype._warn = function(e, t, n) {
                                return g(e, t, n || this)
                            }
                            ,
                            n.onPossiblyUnhandledRejection = function(e) {
                                var t = I();
                                G = "function" == typeof e ? null === t ? e : N.domainBind(t, e) : void 0
                            }
                            ,
                            n.onUnhandledRejectionHandled = function(e) {
                                var t = I();
                                L = "function" == typeof e ? null === t ? e : N.domainBind(t, e) : void 0
                            }
                            ;
                            var $ = function() {};
                            n.longStackTraces = function() {
                                if (B.haveItemsQueued() && !ae.longStackTraces)
                                    throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                if (!ae.longStackTraces && C()) {
                                    var e = n.prototype._captureStackTrace
                                      , t = n.prototype._attachExtraTrace;
                                    ae.longStackTraces = !0,
                                    $ = function() {
                                        if (B.haveItemsQueued() && !ae.longStackTraces)
                                            throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                        n.prototype._captureStackTrace = e,
                                        n.prototype._attachExtraTrace = t,
                                        r.deactivateLongStackTraces(),
                                        B.enableTrampoline(),
                                        ae.longStackTraces = !1
                                    }
                                    ,
                                    n.prototype._captureStackTrace = d,
                                    n.prototype._attachExtraTrace = v,
                                    r.activateLongStackTraces(),
                                    B.disableTrampolineIfNecessary()
                                }
                            }
                            ,
                            n.hasLongStackTraces = function() {
                                return ae.longStackTraces && C()
                            }
                            ;
                            var J = function() {
                                try {
                                    if ("function" == typeof CustomEvent) {
                                        var e = new CustomEvent("CustomEvent");
                                        return N.global.dispatchEvent(e),
                                        function(e, t) {
                                            var n = new CustomEvent(e.toLowerCase(),{
                                                detail: t,
                                                cancelable: !0
                                            });
                                            return !N.global.dispatchEvent(n)
                                        }
                                    }
                                    if ("function" == typeof Event) {
                                        var e = new Event("CustomEvent");
                                        return N.global.dispatchEvent(e),
                                        function(e, t) {
                                            var n = new Event(e.toLowerCase(),{
                                                cancelable: !0
                                            });
                                            return n.detail = t,
                                            !N.global.dispatchEvent(n)
                                        }
                                    }
                                    var e = document.createEvent("CustomEvent");
                                    return e.initCustomEvent("testingtheevent", !1, !0, {}),
                                    N.global.dispatchEvent(e),
                                    function(e, t) {
                                        var n = document.createEvent("CustomEvent");
                                        return n.initCustomEvent(e.toLowerCase(), !1, !0, t),
                                        !N.global.dispatchEvent(n)
                                    }
                                } catch (t) {}
                                return function() {
                                    return !1
                                }
                            }()
                              , Z = function() {
                                return N.isNode ? function() {
                                    return e.emit.apply(e, arguments)
                                }
                                : N.global ? function(e) {
                                    var t = "on" + e.toLowerCase()
                                      , n = N.global[t];
                                    return !!n && (n.apply(N.global, [].slice.call(arguments, 1)),
                                    !0)
                                }
                                : function() {
                                    return !1
                                }
                            }()
                              , ee = {
                                promiseCreated: i,
                                promiseFulfilled: i,
                                promiseRejected: i,
                                promiseResolved: i,
                                promiseCancelled: i,
                                promiseChained: function(e, t, n) {
                                    return {
                                        promise: t,
                                        child: n
                                    }
                                },
                                warning: function(e, t) {
                                    return {
                                        warning: t
                                    }
                                },
                                unhandledRejection: function(e, t, n) {
                                    return {
                                        reason: t,
                                        promise: n
                                    }
                                },
                                rejectionHandled: i
                            }
                              , te = function(e) {
                                var t = !1;
                                try {
                                    t = Z.apply(null, arguments)
                                } catch (n) {
                                    B.throwLater(n),
                                    t = !0
                                }
                                var r = !1;
                                try {
                                    r = J(e, ee[e].apply(null, arguments))
                                } catch (n) {
                                    B.throwLater(n),
                                    r = !0
                                }
                                return r || t
                            };
                            n.config = function(e) {
                                if (e = Object(e),
                                "longStackTraces"in e && (e.longStackTraces ? n.longStackTraces() : !e.longStackTraces && n.hasLongStackTraces() && $()),
                                "warnings"in e) {
                                    var t = e.warnings;
                                    ae.warnings = !!t,
                                    Q = ae.warnings,
                                    N.isObject(t) && "wForgottenReturn"in t && (Q = !!t.wForgottenReturn)
                                }
                                if ("cancellation"in e && e.cancellation && !ae.cancellation) {
                                    if (B.haveItemsQueued())
                                        throw new Error("cannot enable cancellation after promises are in use");
                                    n.prototype._clearCancellationData = l,
                                    n.prototype._propagateFrom = h,
                                    n.prototype._onCancel = u,
                                    n.prototype._setOnCancel = c,
                                    n.prototype._attachCancellationCallback = s,
                                    n.prototype._execute = a,
                                    ne = h,
                                    ae.cancellation = !0
                                }
                                "monitoring"in e && (e.monitoring && !ae.monitoring ? (ae.monitoring = !0,
                                n.prototype._fireEvent = te) : !e.monitoring && ae.monitoring && (ae.monitoring = !1,
                                n.prototype._fireEvent = o))
                            }
                            ,
                            n.prototype._fireEvent = o,
                            n.prototype._execute = function(e, t, n) {
                                try {
                                    e(t, n)
                                } catch (r) {
                                    return r
                                }
                            }
                            ,
                            n.prototype._onCancel = function() {}
                            ,
                            n.prototype._setOnCancel = function(e) {}
                            ,
                            n.prototype._attachCancellationCallback = function(e) {}
                            ,
                            n.prototype._captureStackTrace = function() {}
                            ,
                            n.prototype._attachExtraTrace = function() {}
                            ,
                            n.prototype._clearCancellationData = function() {}
                            ,
                            n.prototype._propagateFrom = function(e, t) {}
                            ;
                            var ne = f
                              , re = function() {
                                return !1
                            }
                              , ie = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                            N.inherits(j, Error),
                            r.CapturedTrace = j,
                            j.prototype.uncycle = function() {
                                var e = this._length;
                                if (!(e < 2)) {
                                    for (var t = [], n = {}, r = 0, i = this; void 0 !== i; ++r)
                                        t.push(i),
                                        i = i._parent;
                                    e = this._length = r;
                                    for (var r = e - 1; r >= 0; --r) {
                                        var o = t[r].stack;
                                        void 0 === n[o] && (n[o] = r)
                                    }
                                    for (var r = 0; r < e; ++r) {
                                        var a = t[r].stack
                                          , s = n[a];
                                        if (void 0 !== s && s !== r) {
                                            s > 0 && (t[s - 1]._parent = void 0,
                                            t[s - 1]._length = 1),
                                            t[r]._parent = void 0,
                                            t[r]._length = 1;
                                            var u = r > 0 ? t[r - 1] : this;
                                            s < e - 1 ? (u._parent = t[s + 1],
                                            u._parent.uncycle(),
                                            u._length = u._parent._length + 1) : (u._parent = void 0,
                                            u._length = 1);
                                            for (var c = u._length + 1, l = r - 2; l >= 0; --l)
                                                t[l]._length = c,
                                                c++;
                                            return
                                        }
                                    }
                                }
                            }
                            ,
                            j.prototype.attachExtraTrace = function(e) {
                                if (!e.__stackCleaned__) {
                                    this.uncycle();
                                    for (var t = E(e), n = t.message, r = [t.stack], i = this; void 0 !== i; )
                                        r.push(S(i.stack.split("\n"))),
                                        i = i._parent;
                                    b(r),
                                    y(r),
                                    N.notEnumerableProp(e, "stack", T(n, r)),
                                    N.notEnumerableProp(e, "__stackCleaned__", !0)
                                }
                            }
                            ;
                            var oe = function() {
                                var e = /^\s*at\s*/
                                  , t = function(e, t) {
                                    return "string" == typeof e ? e : void 0 !== t.name && void 0 !== t.message ? t.toString() : M(t)
                                };
                                if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                                    Error.stackTraceLimit += 6,
                                    W = e,
                                    X = t;
                                    var n = Error.captureStackTrace;
                                    return re = function(e) {
                                        return k.test(e)
                                    }
                                    ,
                                    function(e, t) {
                                        Error.stackTraceLimit += 6,
                                        n(e, t),
                                        Error.stackTraceLimit -= 6
                                    }
                                }
                                var r = new Error;
                                if ("string" == typeof r.stack && r.stack.split("\n")[0].indexOf("stackDetection@") >= 0)
                                    return W = /@/,
                                    X = t,
                                    z = !0,
                                    function(e) {
                                        e.stack = (new Error).stack
                                    }
                                    ;
                                var i;
                                try {
                                    throw new Error
                                } catch (o) {
                                    i = "stack"in o
                                }
                                return "stack"in r || !i || "number" != typeof Error.stackTraceLimit ? (X = function(e, t) {
                                    return "string" == typeof e ? e : "object" != typeof t && "function" != typeof t || void 0 === t.name || void 0 === t.message ? M(t) : t.toString()
                                }
                                ,
                                null) : (W = e,
                                X = t,
                                function(e) {
                                    Error.stackTraceLimit += 6;
                                    try {
                                        throw new Error
                                    } catch (t) {
                                        e.stack = t.stack
                                    }
                                    Error.stackTraceLimit -= 6
                                }
                                )
                            }([]);
                            "undefined" != typeof console && "undefined" != typeof console.warn && (O = function(e) {
                                console.warn(e)
                            }
                            ,
                            N.isNode && e.stderr.isTTY ? O = function(e, t) {
                                var n = t ? "[33m" : "[31m";
                                console.warn(n + e + "[0m\n")
                            }
                            : N.isNode || "string" != typeof (new Error).stack || (O = function(e, t) {
                                console.warn("%c" + e, t ? "color: darkorange" : "color: red")
                            }
                            ));
                            var ae = {
                                warnings: K,
                                longStackTraces: !1,
                                cancellation: !1,
                                monitoring: !1
                            };
                            return Y && n.longStackTraces(),
                            {
                                longStackTraces: function() {
                                    return ae.longStackTraces
                                },
                                warnings: function() {
                                    return ae.warnings
                                },
                                cancellation: function() {
                                    return ae.cancellation
                                },
                                monitoring: function() {
                                    return ae.monitoring
                                },
                                propagateFromFunction: function() {
                                    return ne
                                },
                                boundValueFunction: function() {
                                    return p
                                },
                                checkForgottenReturns: _,
                                setBounds: H,
                                warn: g,
                                deprecated: m,
                                CapturedTrace: j,
                                fireDomEvent: J,
                                fireGlobalEvent: Z
                            }
                        }
                    }
                    , {
                        "./errors": 12,
                        "./util": 36
                    }],
                    10: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            function t() {
                                return this.value
                            }
                            function n() {
                                throw this.reason
                            }
                            e.prototype["return"] = e.prototype.thenReturn = function(n) {
                                return n instanceof e && n.suppressUnhandledRejections(),
                                this._then(t, void 0, void 0, {
                                    value: n
                                }, void 0)
                            }
                            ,
                            e.prototype["throw"] = e.prototype.thenThrow = function(e) {
                                return this._then(n, void 0, void 0, {
                                    reason: e
                                }, void 0)
                            }
                            ,
                            e.prototype.catchThrow = function(e) {
                                if (arguments.length <= 1)
                                    return this._then(void 0, n, void 0, {
                                        reason: e
                                    }, void 0);
                                var t = arguments[1]
                                  , r = function() {
                                    throw t
                                };
                                return this.caught(e, r)
                            }
                            ,
                            e.prototype.catchReturn = function(n) {
                                if (arguments.length <= 1)
                                    return n instanceof e && n.suppressUnhandledRejections(),
                                    this._then(void 0, t, void 0, {
                                        value: n
                                    }, void 0);
                                var r = arguments[1];
                                r instanceof e && r.suppressUnhandledRejections();
                                var i = function() {
                                    return r
                                };
                                return this.caught(n, i)
                            }
                        }
                    }
                    , {}],
                    11: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e, t) {
                            function n() {
                                return o(this)
                            }
                            function r(e, n) {
                                return i(e, n, t, t)
                            }
                            var i = e.reduce
                              , o = e.all;
                            e.prototype.each = function(e) {
                                return i(this, e, t, 0)._then(n, void 0, void 0, this, void 0)
                            }
                            ,
                            e.prototype.mapSeries = function(e) {
                                return i(this, e, t, t)
                            }
                            ,
                            e.each = function(e, r) {
                                return i(e, r, t, 0)._then(n, void 0, void 0, e, void 0)
                            }
                            ,
                            e.mapSeries = r
                        }
                    }
                    , {}],
                    12: [function(e, t, n) {
                        "use strict";
                        function r(e, t) {
                            function n(r) {
                                return this instanceof n ? (h(this, "message", "string" == typeof r ? r : t),
                                h(this, "name", e),
                                void (Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new n(r)
                            }
                            return l(n, Error),
                            n
                        }
                        function i(e) {
                            return this instanceof i ? (h(this, "name", "OperationalError"),
                            h(this, "message", e),
                            this.cause = e,
                            this.isOperational = !0,
                            void (e instanceof Error ? (h(this, "message", e.message),
                            h(this, "stack", e.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new i(e)
                        }
                        var o, a, s = e("./es5"), u = s.freeze, c = e("./util"), l = c.inherits, h = c.notEnumerableProp, f = r("Warning", "warning"), p = r("CancellationError", "cancellation error"), d = r("TimeoutError", "timeout error"), v = r("AggregateError", "aggregate error");
                        try {
                            o = TypeError,
                            a = RangeError
                        } catch (_) {
                            o = r("TypeError", "type error"),
                            a = r("RangeError", "range error")
                        }
                        for (var m = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), g = 0; g < m.length; ++g)
                            "function" == typeof Array.prototype[m[g]] && (v.prototype[m[g]] = Array.prototype[m[g]]);
                        s.defineProperty(v.prototype, "length", {
                            value: 0,
                            configurable: !1,
                            writable: !0,
                            enumerable: !0
                        }),
                        v.prototype.isOperational = !0;
                        var T = 0;
                        v.prototype.toString = function() {
                            var e = Array(4 * T + 1).join(" ")
                              , t = "\n" + e + "AggregateError of:\n";
                            T++,
                            e = Array(4 * T + 1).join(" ");
                            for (var n = 0; n < this.length; ++n) {
                                for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o)
                                    i[o] = e + i[o];
                                r = i.join("\n"),
                                t += r + "\n"
                            }
                            return T--,
                            t
                        }
                        ,
                        l(i, Error);
                        var y = Error.__BluebirdErrorTypes__;
                        y || (y = u({
                            CancellationError: p,
                            TimeoutError: d,
                            OperationalError: i,
                            RejectionError: i,
                            AggregateError: v
                        }),
                        s.defineProperty(Error, "__BluebirdErrorTypes__", {
                            value: y,
                            writable: !1,
                            enumerable: !1,
                            configurable: !1
                        })),
                        t.exports = {
                            Error: Error,
                            TypeError: o,
                            RangeError: a,
                            CancellationError: y.CancellationError,
                            OperationalError: y.OperationalError,
                            TimeoutError: y.TimeoutError,
                            AggregateError: y.AggregateError,
                            Warning: f
                        }
                    }
                    , {
                        "./es5": 13,
                        "./util": 36
                    }],
                    13: [function(e, t, n) {
                        var r = function() {
                            "use strict";
                            return void 0 === this
                        }();
                        if (r)
                            t.exports = {
                                freeze: Object.freeze,
                                defineProperty: Object.defineProperty,
                                getDescriptor: Object.getOwnPropertyDescriptor,
                                keys: Object.keys,
                                names: Object.getOwnPropertyNames,
                                getPrototypeOf: Object.getPrototypeOf,
                                isArray: Array.isArray,
                                isES5: r,
                                propertyIsWritable: function(e, t) {
                                    var n = Object.getOwnPropertyDescriptor(e, t);
                                    return !(n && !n.writable && !n.set)
                                }
                            };
                        else {
                            var i = {}.hasOwnProperty
                              , o = {}.toString
                              , a = {}.constructor.prototype
                              , s = function(e) {
                                var t = [];
                                for (var n in e)
                                    i.call(e, n) && t.push(n);
                                return t
                            }
                              , u = function(e, t) {
                                return {
                                    value: e[t]
                                }
                            }
                              , c = function(e, t, n) {
                                return e[t] = n.value,
                                e
                            }
                              , l = function(e) {
                                return e
                            }
                              , h = function(e) {
                                try {
                                    return Object(e).constructor.prototype
                                } catch (t) {
                                    return a
                                }
                            }
                              , f = function(e) {
                                try {
                                    return "[object Array]" === o.call(e)
                                } catch (t) {
                                    return !1
                                }
                            };
                            t.exports = {
                                isArray: f,
                                keys: s,
                                names: s,
                                defineProperty: c,
                                getDescriptor: u,
                                freeze: l,
                                getPrototypeOf: h,
                                isES5: r,
                                propertyIsWritable: function() {
                                    return !0
                                }
                            }
                        }
                    }
                    , {}],
                    14: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e, t) {
                            var n = e.map;
                            e.prototype.filter = function(e, r) {
                                return n(this, e, r, t)
                            }
                            ,
                            e.filter = function(e, r, i) {
                                return n(e, r, i, t)
                            }
                        }
                    }
                    , {}],
                    15: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n) {
                            function r(e, t, n) {
                                this.promise = e,
                                this.type = t,
                                this.handler = n,
                                this.called = !1,
                                this.cancelPromise = null
                            }
                            function i(e) {
                                this.finallyHandler = e
                            }
                            function o(e, t) {
                                return null != e.cancelPromise && (arguments.length > 1 ? e.cancelPromise._reject(t) : e.cancelPromise._cancel(),
                                e.cancelPromise = null,
                                !0)
                            }
                            function a() {
                                return u.call(this, this.promise._target()._settledValue())
                            }
                            function s(e) {
                                if (!o(this, e))
                                    return h.e = e,
                                    h
                            }
                            function u(e) {
                                var r = this.promise
                                  , u = this.handler;
                                if (!this.called) {
                                    this.called = !0;
                                    var c = this.isFinallyHandler() ? u.call(r._boundValue()) : u.call(r._boundValue(), e);
                                    if (void 0 !== c) {
                                        r._setReturnedNonUndefined();
                                        var f = n(c, r);
                                        if (f instanceof t) {
                                            if (null != this.cancelPromise) {
                                                if (f._isCancelled()) {
                                                    var p = new l("late cancellation observer");
                                                    return r._attachExtraTrace(p),
                                                    h.e = p,
                                                    h
                                                }
                                                f.isPending() && f._attachCancellationCallback(new i(this))
                                            }
                                            return f._then(a, s, void 0, this, void 0)
                                        }
                                    }
                                }
                                return r.isRejected() ? (o(this),
                                h.e = e,
                                h) : (o(this),
                                e)
                            }
                            var c = e("./util")
                              , l = t.CancellationError
                              , h = c.errorObj;
                            return r.prototype.isFinallyHandler = function() {
                                return 0 === this.type
                            }
                            ,
                            i.prototype._resultCancelled = function() {
                                o(this.finallyHandler)
                            }
                            ,
                            t.prototype._passThrough = function(e, t, n, i) {
                                return "function" != typeof e ? this.then() : this._then(n, i, void 0, new r(this,t,e), void 0)
                            }
                            ,
                            t.prototype.lastly = t.prototype["finally"] = function(e) {
                                return this._passThrough(e, 0, u, u)
                            }
                            ,
                            t.prototype.tap = function(e) {
                                return this._passThrough(e, 1, u)
                            }
                            ,
                            r
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    16: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i, o, a) {
                            function s(e, n, r) {
                                for (var o = 0; o < n.length; ++o) {
                                    r._pushContext();
                                    var a = p(n[o])(e);
                                    if (r._popContext(),
                                    a === f) {
                                        r._pushContext();
                                        var s = t.reject(f.e);
                                        return r._popContext(),
                                        s
                                    }
                                    var u = i(a, r);
                                    if (u instanceof t)
                                        return u
                                }
                                return null
                            }
                            function u(e, n, i, o) {
                                if (a.cancellation()) {
                                    var s = new t(r)
                                      , u = this._finallyPromise = new t(r);
                                    this._promise = s.lastly(function() {
                                        return u
                                    }),
                                    s._captureStackTrace(),
                                    s._setOnCancel(this)
                                } else {
                                    var c = this._promise = new t(r);
                                    c._captureStackTrace()
                                }
                                this._stack = o,
                                this._generatorFunction = e,
                                this._receiver = n,
                                this._generator = void 0,
                                this._yieldHandlers = "function" == typeof i ? [i].concat(d) : d,
                                this._yieldedPromise = null,
                                this._cancellationPhase = !1
                            }
                            var c = e("./errors")
                              , l = c.TypeError
                              , h = e("./util")
                              , f = h.errorObj
                              , p = h.tryCatch
                              , d = [];
                            h.inherits(u, o),
                            u.prototype._isResolved = function() {
                                return null === this._promise
                            }
                            ,
                            u.prototype._cleanup = function() {
                                this._promise = this._generator = null,
                                a.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(),
                                this._finallyPromise = null)
                            }
                            ,
                            u.prototype._promiseCancelled = function() {
                                if (!this._isResolved()) {
                                    var e, n = "undefined" != typeof this._generator["return"];
                                    if (n)
                                        this._promise._pushContext(),
                                        e = p(this._generator["return"]).call(this._generator, void 0),
                                        this._promise._popContext();
                                    else {
                                        var r = new t.CancellationError("generator .return() sentinel");
                                        t.coroutine.returnSentinel = r,
                                        this._promise._attachExtraTrace(r),
                                        this._promise._pushContext(),
                                        e = p(this._generator["throw"]).call(this._generator, r),
                                        this._promise._popContext()
                                    }
                                    this._cancellationPhase = !0,
                                    this._yieldedPromise = null,
                                    this._continue(e)
                                }
                            }
                            ,
                            u.prototype._promiseFulfilled = function(e) {
                                this._yieldedPromise = null,
                                this._promise._pushContext();
                                var t = p(this._generator.next).call(this._generator, e);
                                this._promise._popContext(),
                                this._continue(t)
                            }
                            ,
                            u.prototype._promiseRejected = function(e) {
                                this._yieldedPromise = null,
                                this._promise._attachExtraTrace(e),
                                this._promise._pushContext();
                                var t = p(this._generator["throw"]).call(this._generator, e);
                                this._promise._popContext(),
                                this._continue(t)
                            }
                            ,
                            u.prototype._resultCancelled = function() {
                                if (this._yieldedPromise instanceof t) {
                                    var e = this._yieldedPromise;
                                    this._yieldedPromise = null,
                                    e.cancel()
                                }
                            }
                            ,
                            u.prototype.promise = function() {
                                return this._promise
                            }
                            ,
                            u.prototype._run = function() {
                                this._generator = this._generatorFunction.call(this._receiver),
                                this._receiver = this._generatorFunction = void 0,
                                this._promiseFulfilled(void 0)
                            }
                            ,
                            u.prototype._continue = function(e) {
                                var n = this._promise;
                                if (e === f)
                                    return this._cleanup(),
                                    this._cancellationPhase ? n.cancel() : n._rejectCallback(e.e, !1);
                                var r = e.value;
                                if (e.done === !0)
                                    return this._cleanup(),
                                    this._cancellationPhase ? n.cancel() : n._resolveCallback(r);
                                var o = i(r, this._promise);
                                if (!(o instanceof t) && (o = s(o, this._yieldHandlers, this._promise),
                                null === o))
                                    return void this._promiseRejected(new l("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", r) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                                o = o._target();
                                var a = o._bitField;
                                0 === (50397184 & a) ? (this._yieldedPromise = o,
                                o._proxy(this, null)) : 0 !== (33554432 & a) ? t._async.invoke(this._promiseFulfilled, this, o._value()) : 0 !== (16777216 & a) ? t._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled()
                            }
                            ,
                            t.coroutine = function(e, t) {
                                if ("function" != typeof e)
                                    throw new l("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                var n = Object(t).yieldHandler
                                  , r = u
                                  , i = (new Error).stack;
                                return function() {
                                    var t = e.apply(this, arguments)
                                      , o = new r((void 0),(void 0),n,i)
                                      , a = o.promise();
                                    return o._generator = t,
                                    o._promiseFulfilled(void 0),
                                    a
                                }
                            }
                            ,
                            t.coroutine.addYieldHandler = function(e) {
                                if ("function" != typeof e)
                                    throw new l("expecting a function but got " + h.classString(e));
                                d.push(e)
                            }
                            ,
                            t.spawn = function(e) {
                                if (a.deprecated("Promise.spawn()", "Promise.coroutine()"),
                                "function" != typeof e)
                                    return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                var r = new u(e,this)
                                  , i = r.promise();
                                return r._run(t.spawn),
                                i
                            }
                        }
                    }
                    , {
                        "./errors": 12,
                        "./util": 36
                    }],
                    17: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i, o, a) {
                            var s = e("./util");
                            s.canEvaluate,
                            s.tryCatch,
                            s.errorObj;
                            t.join = function() {
                                var e, t = arguments.length - 1;
                                if (t > 0 && "function" == typeof arguments[t]) {
                                    e = arguments[t];
                                    var r
                                }
                                var i = [].slice.call(arguments);
                                e && i.pop();
                                var r = new n(i).promise();
                                return void 0 !== e ? r.spread(e) : r
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    18: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i, o, a) {
                            function s(e, t, n, r) {
                                this.constructor$(e),
                                this._promise._captureStackTrace();
                                var i = c();
                                this._callback = null === i ? t : l.domainBind(i, t),
                                this._preservedValues = r === o ? new Array(this.length()) : null,
                                this._limit = n,
                                this._inFlight = 0,
                                this._queue = [],
                                p.invoke(this._asyncInit, this, void 0)
                            }
                            function u(e, n, i, o) {
                                if ("function" != typeof n)
                                    return r("expecting a function but got " + l.classString(n));
                                var a = 0;
                                if (void 0 !== i) {
                                    if ("object" != typeof i || null === i)
                                        return t.reject(new TypeError("options argument must be an object but it is " + l.classString(i)));
                                    if ("number" != typeof i.concurrency)
                                        return t.reject(new TypeError("'concurrency' must be a number but it is " + l.classString(i.concurrency)));
                                    a = i.concurrency
                                }
                                return a = "number" == typeof a && isFinite(a) && a >= 1 ? a : 0,
                                new s(e,n,a,o).promise()
                            }
                            var c = t._getDomain
                              , l = e("./util")
                              , h = l.tryCatch
                              , f = l.errorObj
                              , p = t._async;
                            l.inherits(s, n),
                            s.prototype._asyncInit = function() {
                                this._init$(void 0, -2)
                            }
                            ,
                            s.prototype._init = function() {}
                            ,
                            s.prototype._promiseFulfilled = function(e, n) {
                                var r = this._values
                                  , o = this.length()
                                  , s = this._preservedValues
                                  , u = this._limit;
                                if (n < 0) {
                                    if (n = n * -1 - 1,
                                    r[n] = e,
                                    u >= 1 && (this._inFlight--,
                                    this._drainQueue(),
                                    this._isResolved()))
                                        return !0
                                } else {
                                    if (u >= 1 && this._inFlight >= u)
                                        return r[n] = e,
                                        this._queue.push(n),
                                        !1;
                                    null !== s && (s[n] = e);
                                    var c = this._promise
                                      , l = this._callback
                                      , p = c._boundValue();
                                    c._pushContext();
                                    var d = h(l).call(p, e, n, o)
                                      , v = c._popContext();
                                    if (a.checkForgottenReturns(d, v, null !== s ? "Promise.filter" : "Promise.map", c),
                                    d === f)
                                        return this._reject(d.e),
                                        !0;
                                    var _ = i(d, this._promise);
                                    if (_ instanceof t) {
                                        _ = _._target();
                                        var m = _._bitField;
                                        if (0 === (50397184 & m))
                                            return u >= 1 && this._inFlight++,
                                            r[n] = _,
                                            _._proxy(this, (n + 1) * -1),
                                            !1;
                                        if (0 === (33554432 & m))
                                            return 0 !== (16777216 & m) ? (this._reject(_._reason()),
                                            !0) : (this._cancel(),
                                            !0);
                                        d = _._value()
                                    }
                                    r[n] = d
                                }
                                var g = ++this._totalResolved;
                                return g >= o && (null !== s ? this._filter(r, s) : this._resolve(r),
                                !0)
                            }
                            ,
                            s.prototype._drainQueue = function() {
                                for (var e = this._queue, t = this._limit, n = this._values; e.length > 0 && this._inFlight < t; ) {
                                    if (this._isResolved())
                                        return;
                                    var r = e.pop();
                                    this._promiseFulfilled(n[r], r)
                                }
                            }
                            ,
                            s.prototype._filter = function(e, t) {
                                for (var n = t.length, r = new Array(n), i = 0, o = 0; o < n; ++o)
                                    e[o] && (r[i++] = t[o]);
                                r.length = i,
                                this._resolve(r)
                            }
                            ,
                            s.prototype.preservedValues = function() {
                                return this._preservedValues
                            }
                            ,
                            t.prototype.map = function(e, t) {
                                return u(this, e, t, null)
                            }
                            ,
                            t.map = function(e, t, n, r) {
                                return u(e, t, n, r)
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    19: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i, o) {
                            var a = e("./util")
                              , s = a.tryCatch;
                            t.method = function(e) {
                                if ("function" != typeof e)
                                    throw new t.TypeError("expecting a function but got " + a.classString(e));
                                return function() {
                                    var r = new t(n);
                                    r._captureStackTrace(),
                                    r._pushContext();
                                    var i = s(e).apply(this, arguments)
                                      , a = r._popContext();
                                    return o.checkForgottenReturns(i, a, "Promise.method", r),
                                    r._resolveFromSyncValue(i),
                                    r
                                }
                            }
                            ,
                            t.attempt = t["try"] = function(e) {
                                if ("function" != typeof e)
                                    return i("expecting a function but got " + a.classString(e));
                                var r = new t(n);
                                r._captureStackTrace(),
                                r._pushContext();
                                var u;
                                if (arguments.length > 1) {
                                    o.deprecated("calling Promise.try with more than 1 argument");
                                    var c = arguments[1]
                                      , l = arguments[2];
                                    u = a.isArray(c) ? s(e).apply(l, c) : s(e).call(l, c)
                                } else
                                    u = s(e)();
                                var h = r._popContext();
                                return o.checkForgottenReturns(u, h, "Promise.try", r),
                                r._resolveFromSyncValue(u),
                                r
                            }
                            ,
                            t.prototype._resolveFromSyncValue = function(e) {
                                e === a.errorObj ? this._rejectCallback(e.e, !1) : this._resolveCallback(e, !0)
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    20: [function(e, t, n) {
                        "use strict";
                        function r(e) {
                            return e instanceof Error && l.getPrototypeOf(e) === Error.prototype
                        }
                        function i(e) {
                            var t;
                            if (r(e)) {
                                t = new c(e),
                                t.name = e.name,
                                t.message = e.message,
                                t.stack = e.stack;
                                for (var n = l.keys(e), i = 0; i < n.length; ++i) {
                                    var o = n[i];
                                    h.test(o) || (t[o] = e[o])
                                }
                                return t
                            }
                            return a.markAsOriginatingFromRejection(e),
                            e
                        }
                        function o(e, t) {
                            return function(n, r) {
                                if (null !== e) {
                                    if (n) {
                                        var o = i(s(n));
                                        e._attachExtraTrace(o),
                                        e._reject(o)
                                    } else if (t) {
                                        var a = [].slice.call(arguments, 1);
                                        e._fulfill(a)
                                    } else
                                        e._fulfill(r);
                                    e = null
                                }
                            }
                        }
                        var a = e("./util")
                          , s = a.maybeWrapAsError
                          , u = e("./errors")
                          , c = u.OperationalError
                          , l = e("./es5")
                          , h = /^(?:name|message|stack|cause)$/;
                        t.exports = o
                    }
                    , {
                        "./errors": 12,
                        "./es5": 13,
                        "./util": 36
                    }],
                    21: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t) {
                            function n(e, t) {
                                var n = this;
                                if (!o.isArray(e))
                                    return r.call(n, e, t);
                                var i = s(t).apply(n._boundValue(), [null].concat(e));
                                i === u && a.throwLater(i.e)
                            }
                            function r(e, t) {
                                var n = this
                                  , r = n._boundValue()
                                  , i = void 0 === e ? s(t).call(r, null) : s(t).call(r, null, e);
                                i === u && a.throwLater(i.e)
                            }
                            function i(e, t) {
                                var n = this;
                                if (!e) {
                                    var r = new Error(e + "");
                                    r.cause = e,
                                    e = r
                                }
                                var i = s(t).call(n._boundValue(), e);
                                i === u && a.throwLater(i.e)
                            }
                            var o = e("./util")
                              , a = t._async
                              , s = o.tryCatch
                              , u = o.errorObj;
                            t.prototype.asCallback = t.prototype.nodeify = function(e, t) {
                                if ("function" == typeof e) {
                                    var o = r;
                                    void 0 !== t && Object(t).spread && (o = n),
                                    this._then(o, i, void 0, this, e)
                                }
                                return this
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    22: [function(t, n, r) {
                        "use strict";
                        n.exports = function() {
                            function r() {}
                            function i(e, t) {
                                if ("function" != typeof t)
                                    throw new T("expecting a function but got " + d.classString(t));
                                if (e.constructor !== o)
                                    throw new T("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n")
                            }
                            function o(e) {
                                this._bitField = 0,
                                this._fulfillmentHandler0 = void 0,
                                this._rejectionHandler0 = void 0,
                                this._promise0 = void 0,
                                this._receiver0 = void 0,
                                e !== b && (i(this, e),
                                this._resolveFromExecutor(e)),
                                this._promiseCreated(),
                                this._fireEvent("promiseCreated", this)
                            }
                            function a(e) {
                                this.promise._resolveCallback(e)
                            }
                            function s(e) {
                                this.promise._rejectCallback(e, !1)
                            }
                            function u(e) {
                                var t = new o(b);
                                t._fulfillmentHandler0 = e,
                                t._rejectionHandler0 = e,
                                t._promise0 = e,
                                t._receiver0 = e
                            }
                            var c, l = function() {
                                return new T("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")
                            }, h = function() {
                                return new o.PromiseInspection(this._target())
                            }, f = function(e) {
                                return o.reject(new T(e))
                            }, p = {}, d = t("./util");
                            c = d.isNode ? function() {
                                var t = e.domain;
                                return void 0 === t && (t = null),
                                t
                            }
                            : function() {
                                return null
                            }
                            ,
                            d.notEnumerableProp(o, "_getDomain", c);
                            var v = t("./es5")
                              , _ = t("./async")
                              , m = new _;
                            v.defineProperty(o, "_async", {
                                value: m
                            });
                            var g = t("./errors")
                              , T = o.TypeError = g.TypeError;
                            o.RangeError = g.RangeError;
                            var y = o.CancellationError = g.CancellationError;
                            o.TimeoutError = g.TimeoutError,
                            o.OperationalError = g.OperationalError,
                            o.RejectionError = g.OperationalError,
                            o.AggregateError = g.AggregateError;
                            var b = function() {}
                              , S = {}
                              , P = {}
                              , E = t("./thenables")(o, b)
                              , A = t("./promise_array")(o, b, E, f, r)
                              , w = t("./context")(o)
                              , M = w.create
                              , x = t("./debuggability")(o, w)
                              , C = (x.CapturedTrace,
                            t("./finally")(o, E))
                              , R = t("./catch_filter")(P)
                              , H = t("./nodeback")
                              , j = d.errorObj
                              , L = d.tryCatch;
                            return o.prototype.toString = function() {
                                return "[object Promise]"
                            }
                            ,
                            o.prototype.caught = o.prototype["catch"] = function(e) {
                                var t = arguments.length;
                                if (t > 1) {
                                    var n, r = new Array(t - 1), i = 0;
                                    for (n = 0; n < t - 1; ++n) {
                                        var o = arguments[n];
                                        if (!d.isObject(o))
                                            return f("expecting an object but got A catch statement predicate " + d.classString(o));
                                        r[i++] = o
                                    }
                                    return r.length = i,
                                    e = arguments[n],
                                    this.then(void 0, R(r, e, this))
                                }
                                return this.then(void 0, e)
                            }
                            ,
                            o.prototype.reflect = function() {
                                return this._then(h, h, void 0, this, void 0)
                            }
                            ,
                            o.prototype.then = function(e, t) {
                                if (x.warnings() && arguments.length > 0 && "function" != typeof e && "function" != typeof t) {
                                    var n = ".then() only accepts functions but was passed: " + d.classString(e);
                                    arguments.length > 1 && (n += ", " + d.classString(t)),
                                    this._warn(n)
                                }
                                return this._then(e, t, void 0, void 0, void 0)
                            }
                            ,
                            o.prototype.done = function(e, t) {
                                var n = this._then(e, t, void 0, void 0, void 0);
                                n._setIsFinal()
                            }
                            ,
                            o.prototype.spread = function(e) {
                                return "function" != typeof e ? f("expecting a function but got " + d.classString(e)) : this.all()._then(e, void 0, void 0, S, void 0)
                            }
                            ,
                            o.prototype.toJSON = function() {
                                var e = {
                                    isFulfilled: !1,
                                    isRejected: !1,
                                    fulfillmentValue: void 0,
                                    rejectionReason: void 0
                                };
                                return this.isFulfilled() ? (e.fulfillmentValue = this.value(),
                                e.isFulfilled = !0) : this.isRejected() && (e.rejectionReason = this.reason(),
                                e.isRejected = !0),
                                e
                            }
                            ,
                            o.prototype.all = function() {
                                return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"),
                                new A(this).promise()
                            }
                            ,
                            o.prototype.error = function(e) {
                                return this.caught(d.originatesFromRejection, e)
                            }
                            ,
                            o.getNewLibraryCopy = n.exports,
                            o.is = function(e) {
                                return e instanceof o
                            }
                            ,
                            o.fromNode = o.fromCallback = function(e) {
                                var t = new o(b);
                                t._captureStackTrace();
                                var n = arguments.length > 1 && !!Object(arguments[1]).multiArgs
                                  , r = L(e)(H(t, n));
                                return r === j && t._rejectCallback(r.e, !0),
                                t._isFateSealed() || t._setAsyncGuaranteed(),
                                t
                            }
                            ,
                            o.all = function(e) {
                                return new A(e).promise()
                            }
                            ,
                            o.cast = function(e) {
                                var t = E(e);
                                return t instanceof o || (t = new o(b),
                                t._captureStackTrace(),
                                t._setFulfilled(),
                                t._rejectionHandler0 = e),
                                t
                            }
                            ,
                            o.resolve = o.fulfilled = o.cast,
                            o.reject = o.rejected = function(e) {
                                var t = new o(b);
                                return t._captureStackTrace(),
                                t._rejectCallback(e, !0),
                                t
                            }
                            ,
                            o.setScheduler = function(e) {
                                if ("function" != typeof e)
                                    throw new T("expecting a function but got " + d.classString(e));
                                return m.setScheduler(e)
                            }
                            ,
                            o.prototype._then = function(e, t, n, r, i) {
                                var a = void 0 !== i
                                  , s = a ? i : new o(b)
                                  , u = this._target()
                                  , l = u._bitField;
                                a || (s._propagateFrom(this, 3),
                                s._captureStackTrace(),
                                void 0 === r && 0 !== (2097152 & this._bitField) && (r = 0 !== (50397184 & l) ? this._boundValue() : u === this ? void 0 : this._boundTo),
                                this._fireEvent("promiseChained", this, s));
                                var h = c();
                                if (0 !== (50397184 & l)) {
                                    var f, p, v = u._settlePromiseCtx;
                                    0 !== (33554432 & l) ? (p = u._rejectionHandler0,
                                    f = e) : 0 !== (16777216 & l) ? (p = u._fulfillmentHandler0,
                                    f = t,
                                    u._unsetRejectionIsUnhandled()) : (v = u._settlePromiseLateCancellationObserver,
                                    p = new y("late cancellation observer"),
                                    u._attachExtraTrace(p),
                                    f = t),
                                    m.invoke(v, u, {
                                        handler: null === h ? f : "function" == typeof f && d.domainBind(h, f),
                                        promise: s,
                                        receiver: r,
                                        value: p
                                    })
                                } else
                                    u._addCallbacks(e, t, s, r, h);
                                return s
                            }
                            ,
                            o.prototype._length = function() {
                                return 65535 & this._bitField
                            }
                            ,
                            o.prototype._isFateSealed = function() {
                                return 0 !== (117506048 & this._bitField)
                            }
                            ,
                            o.prototype._isFollowing = function() {
                                return 67108864 === (67108864 & this._bitField)
                            }
                            ,
                            o.prototype._setLength = function(e) {
                                this._bitField = this._bitField & -65536 | 65535 & e
                            }
                            ,
                            o.prototype._setFulfilled = function() {
                                this._bitField = 33554432 | this._bitField,
                                this._fireEvent("promiseFulfilled", this)
                            }
                            ,
                            o.prototype._setRejected = function() {
                                this._bitField = 16777216 | this._bitField,
                                this._fireEvent("promiseRejected", this)
                            }
                            ,
                            o.prototype._setFollowing = function() {
                                this._bitField = 67108864 | this._bitField,
                                this._fireEvent("promiseResolved", this)
                            }
                            ,
                            o.prototype._setIsFinal = function() {
                                this._bitField = 4194304 | this._bitField
                            }
                            ,
                            o.prototype._isFinal = function() {
                                return (4194304 & this._bitField) > 0
                            }
                            ,
                            o.prototype._unsetCancelled = function() {
                                this._bitField = this._bitField & -65537
                            }
                            ,
                            o.prototype._setCancelled = function() {
                                this._bitField = 65536 | this._bitField,
                                this._fireEvent("promiseCancelled", this)
                            }
                            ,
                            o.prototype._setWillBeCancelled = function() {
                                this._bitField = 8388608 | this._bitField
                            }
                            ,
                            o.prototype._setAsyncGuaranteed = function() {
                                m.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField)
                            }
                            ,
                            o.prototype._receiverAt = function(e) {
                                var t = 0 === e ? this._receiver0 : this[4 * e - 4 + 3];
                                if (t !== p)
                                    return void 0 === t && this._isBound() ? this._boundValue() : t
                            }
                            ,
                            o.prototype._promiseAt = function(e) {
                                return this[4 * e - 4 + 2]
                            }
                            ,
                            o.prototype._fulfillmentHandlerAt = function(e) {
                                return this[4 * e - 4 + 0]
                            }
                            ,
                            o.prototype._rejectionHandlerAt = function(e) {
                                return this[4 * e - 4 + 1]
                            }
                            ,
                            o.prototype._boundValue = function() {}
                            ,
                            o.prototype._migrateCallback0 = function(e) {
                                var t = (e._bitField,
                                e._fulfillmentHandler0)
                                  , n = e._rejectionHandler0
                                  , r = e._promise0
                                  , i = e._receiverAt(0);
                                void 0 === i && (i = p),
                                this._addCallbacks(t, n, r, i, null)
                            }
                            ,
                            o.prototype._migrateCallbackAt = function(e, t) {
                                var n = e._fulfillmentHandlerAt(t)
                                  , r = e._rejectionHandlerAt(t)
                                  , i = e._promiseAt(t)
                                  , o = e._receiverAt(t);
                                void 0 === o && (o = p),
                                this._addCallbacks(n, r, i, o, null)
                            }
                            ,
                            o.prototype._addCallbacks = function(e, t, n, r, i) {
                                var o = this._length();
                                if (o >= 65531 && (o = 0,
                                this._setLength(0)),
                                0 === o)
                                    this._promise0 = n,
                                    this._receiver0 = r,
                                    "function" == typeof e && (this._fulfillmentHandler0 = null === i ? e : d.domainBind(i, e)),
                                    "function" == typeof t && (this._rejectionHandler0 = null === i ? t : d.domainBind(i, t));
                                else {
                                    var a = 4 * o - 4;
                                    this[a + 2] = n,
                                    this[a + 3] = r,
                                    "function" == typeof e && (this[a + 0] = null === i ? e : d.domainBind(i, e)),
                                    "function" == typeof t && (this[a + 1] = null === i ? t : d.domainBind(i, t))
                                }
                                return this._setLength(o + 1),
                                o
                            }
                            ,
                            o.prototype._proxy = function(e, t) {
                                this._addCallbacks(void 0, void 0, t, e, null)
                            }
                            ,
                            o.prototype._resolveCallback = function(e, t) {
                                if (0 === (117506048 & this._bitField)) {
                                    if (e === this)
                                        return this._rejectCallback(l(), !1);
                                    var n = E(e, this);
                                    if (!(n instanceof o))
                                        return this._fulfill(e);
                                    t && this._propagateFrom(n, 2);
                                    var r = n._target();
                                    if (r === this)
                                        return void this._reject(l());
                                    var i = r._bitField;
                                    if (0 === (50397184 & i)) {
                                        var a = this._length();
                                        a > 0 && r._migrateCallback0(this);
                                        for (var s = 1; s < a; ++s)
                                            r._migrateCallbackAt(this, s);
                                        this._setFollowing(),
                                        this._setLength(0),
                                        this._setFollowee(r)
                                    } else if (0 !== (33554432 & i))
                                        this._fulfill(r._value());
                                    else if (0 !== (16777216 & i))
                                        this._reject(r._reason());
                                    else {
                                        var u = new y("late cancellation observer");
                                        r._attachExtraTrace(u),
                                        this._reject(u)
                                    }
                                }
                            }
                            ,
                            o.prototype._rejectCallback = function(e, t, n) {
                                var r = d.ensureErrorObject(e)
                                  , i = r === e;
                                if (!i && !n && x.warnings()) {
                                    var o = "a promise was rejected with a non-error: " + d.classString(e);
                                    this._warn(o, !0)
                                }
                                this._attachExtraTrace(r, !!t && i),
                                this._reject(e)
                            }
                            ,
                            o.prototype._resolveFromExecutor = function(e) {
                                var t = this;
                                this._captureStackTrace(),
                                this._pushContext();
                                var n = !0
                                  , r = this._execute(e, function(e) {
                                    t._resolveCallback(e)
                                }, function(e) {
                                    t._rejectCallback(e, n)
                                });
                                n = !1,
                                this._popContext(),
                                void 0 !== r && t._rejectCallback(r, !0)
                            }
                            ,
                            o.prototype._settlePromiseFromHandler = function(e, t, n, r) {
                                var i = r._bitField;
                                if (0 === (65536 & i)) {
                                    r._pushContext();
                                    var o;
                                    t === S ? n && "number" == typeof n.length ? o = L(e).apply(this._boundValue(), n) : (o = j,
                                    o.e = new T("cannot .spread() a non-array: " + d.classString(n))) : o = L(e).call(t, n);
                                    var a = r._popContext();
                                    i = r._bitField,
                                    0 === (65536 & i) && (o === P ? r._reject(n) : o === j ? r._rejectCallback(o.e, !1) : (x.checkForgottenReturns(o, a, "", r, this),
                                    r._resolveCallback(o)))
                                }
                            }
                            ,
                            o.prototype._target = function() {
                                for (var e = this; e._isFollowing(); )
                                    e = e._followee();
                                return e
                            }
                            ,
                            o.prototype._followee = function() {
                                return this._rejectionHandler0
                            }
                            ,
                            o.prototype._setFollowee = function(e) {
                                this._rejectionHandler0 = e
                            }
                            ,
                            o.prototype._settlePromise = function(e, t, n, i) {
                                var a = e instanceof o
                                  , s = this._bitField
                                  , u = 0 !== (134217728 & s);
                                0 !== (65536 & s) ? (a && e._invokeInternalOnCancel(),
                                n instanceof C && n.isFinallyHandler() ? (n.cancelPromise = e,
                                L(t).call(n, i) === j && e._reject(j.e)) : t === h ? e._fulfill(h.call(n)) : n instanceof r ? n._promiseCancelled(e) : a || e instanceof A ? e._cancel() : n.cancel()) : "function" == typeof t ? a ? (u && e._setAsyncGuaranteed(),
                                this._settlePromiseFromHandler(t, n, i, e)) : t.call(n, i, e) : n instanceof r ? n._isResolved() || (0 !== (33554432 & s) ? n._promiseFulfilled(i, e) : n._promiseRejected(i, e)) : a && (u && e._setAsyncGuaranteed(),
                                0 !== (33554432 & s) ? e._fulfill(i) : e._reject(i))
                            }
                            ,
                            o.prototype._settlePromiseLateCancellationObserver = function(e) {
                                var t = e.handler
                                  , n = e.promise
                                  , r = e.receiver
                                  , i = e.value;
                                "function" == typeof t ? n instanceof o ? this._settlePromiseFromHandler(t, r, i, n) : t.call(r, i, n) : n instanceof o && n._reject(i)
                            }
                            ,
                            o.prototype._settlePromiseCtx = function(e) {
                                this._settlePromise(e.promise, e.handler, e.receiver, e.value)
                            }
                            ,
                            o.prototype._settlePromise0 = function(e, t, n) {
                                var r = this._promise0
                                  , i = this._receiverAt(0);
                                this._promise0 = void 0,
                                this._receiver0 = void 0,
                                this._settlePromise(r, e, i, t)
                            }
                            ,
                            o.prototype._clearCallbackDataAtIndex = function(e) {
                                var t = 4 * e - 4;
                                this[t + 2] = this[t + 3] = this[t + 0] = this[t + 1] = void 0
                            }
                            ,
                            o.prototype._fulfill = function(e) {
                                var t = this._bitField;
                                if (!((117506048 & t) >>> 16)) {
                                    if (e === this) {
                                        var n = l();
                                        return this._attachExtraTrace(n),
                                        this._reject(n)
                                    }
                                    this._setFulfilled(),
                                    this._rejectionHandler0 = e,
                                    (65535 & t) > 0 && (0 !== (134217728 & t) ? this._settlePromises() : m.settlePromises(this))
                                }
                            }
                            ,
                            o.prototype._reject = function(e) {
                                var t = this._bitField;
                                if (!((117506048 & t) >>> 16))
                                    return this._setRejected(),
                                    this._fulfillmentHandler0 = e,
                                    this._isFinal() ? m.fatalError(e, d.isNode) : void ((65535 & t) > 0 ? m.settlePromises(this) : this._ensurePossibleRejectionHandled())
                            }
                            ,
                            o.prototype._fulfillPromises = function(e, t) {
                                for (var n = 1; n < e; n++) {
                                    var r = this._fulfillmentHandlerAt(n)
                                      , i = this._promiseAt(n)
                                      , o = this._receiverAt(n);
                                    this._clearCallbackDataAtIndex(n),
                                    this._settlePromise(i, r, o, t)
                                }
                            }
                            ,
                            o.prototype._rejectPromises = function(e, t) {
                                for (var n = 1; n < e; n++) {
                                    var r = this._rejectionHandlerAt(n)
                                      , i = this._promiseAt(n)
                                      , o = this._receiverAt(n);
                                    this._clearCallbackDataAtIndex(n),
                                    this._settlePromise(i, r, o, t)
                                }
                            }
                            ,
                            o.prototype._settlePromises = function() {
                                var e = this._bitField
                                  , t = 65535 & e;
                                if (t > 0) {
                                    if (0 !== (16842752 & e)) {
                                        var n = this._fulfillmentHandler0;
                                        this._settlePromise0(this._rejectionHandler0, n, e),
                                        this._rejectPromises(t, n)
                                    } else {
                                        var r = this._rejectionHandler0;
                                        this._settlePromise0(this._fulfillmentHandler0, r, e),
                                        this._fulfillPromises(t, r)
                                    }
                                    this._setLength(0)
                                }
                                this._clearCancellationData()
                            }
                            ,
                            o.prototype._settledValue = function() {
                                var e = this._bitField;
                                return 0 !== (33554432 & e) ? this._rejectionHandler0 : 0 !== (16777216 & e) ? this._fulfillmentHandler0 : void 0
                            }
                            ,
                            o.defer = o.pending = function() {
                                x.deprecated("Promise.defer", "new Promise");
                                var e = new o(b);
                                return {
                                    promise: e,
                                    resolve: a,
                                    reject: s
                                }
                            }
                            ,
                            d.notEnumerableProp(o, "_makeSelfResolutionError", l),
                            t("./method")(o, b, E, f, x),
                            t("./bind")(o, b, E, x),
                            t("./cancel")(o, A, f, x),
                            t("./direct_resolve")(o),
                            t("./synchronous_inspection")(o),
                            t("./join")(o, A, E, b, m, c),
                            o.Promise = o,
                            o.version = "3.4.6",
                            t("./map.js")(o, A, f, E, b, x),
                            t("./call_get.js")(o),
                            t("./using.js")(o, f, E, M, b, x),
                            t("./timers.js")(o, b, x),
                            t("./generators.js")(o, f, b, E, r, x),
                            t("./nodeify.js")(o),
                            t("./promisify.js")(o, b),
                            t("./props.js")(o, A, E, f),
                            t("./race.js")(o, b, E, f),
                            t("./reduce.js")(o, A, f, E, b, x),
                            t("./settle.js")(o, A, x),
                            t("./some.js")(o, A, f),
                            t("./filter.js")(o, b),
                            t("./each.js")(o, b),
                            t("./any.js")(o),
                            d.toFastProperties(o),
                            d.toFastProperties(o.prototype),
                            u({
                                a: 1
                            }),
                            u({
                                b: 2
                            }),
                            u({
                                c: 3
                            }),
                            u(1),
                            u(function() {}),
                            u(void 0),
                            u(!1),
                            u(new o(b)),
                            x.setBounds(_.firstLineError, d.lastLineError),
                            o
                        }
                    }
                    , {
                        "./any.js": 1,
                        "./async": 2,
                        "./bind": 3,
                        "./call_get.js": 5,
                        "./cancel": 6,
                        "./catch_filter": 7,
                        "./context": 8,
                        "./debuggability": 9,
                        "./direct_resolve": 10,
                        "./each.js": 11,
                        "./errors": 12,
                        "./es5": 13,
                        "./filter.js": 14,
                        "./finally": 15,
                        "./generators.js": 16,
                        "./join": 17,
                        "./map.js": 18,
                        "./method": 19,
                        "./nodeback": 20,
                        "./nodeify.js": 21,
                        "./promise_array": 23,
                        "./promisify.js": 24,
                        "./props.js": 25,
                        "./race.js": 27,
                        "./reduce.js": 28,
                        "./settle.js": 30,
                        "./some.js": 31,
                        "./synchronous_inspection": 32,
                        "./thenables": 33,
                        "./timers.js": 34,
                        "./using.js": 35,
                        "./util": 36
                    }],
                    23: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i, o) {
                            function a(e) {
                                switch (e) {
                                case -2:
                                    return [];
                                case -3:
                                    return {}
                                }
                            }
                            function s(e) {
                                var r = this._promise = new t(n);
                                e instanceof t && r._propagateFrom(e, 3),
                                r._setOnCancel(this),
                                this._values = e,
                                this._length = 0,
                                this._totalResolved = 0,
                                this._init(void 0, -2)
                            }
                            var u = e("./util");
                            u.isArray;
                            return u.inherits(s, o),
                            s.prototype.length = function() {
                                return this._length
                            }
                            ,
                            s.prototype.promise = function() {
                                return this._promise
                            }
                            ,
                            s.prototype._init = function c(e, n) {
                                var o = r(this._values, this._promise);
                                if (o instanceof t) {
                                    o = o._target();
                                    var s = o._bitField;
                                    if (this._values = o,
                                    0 === (50397184 & s))
                                        return this._promise._setAsyncGuaranteed(),
                                        o._then(c, this._reject, void 0, this, n);
                                    if (0 === (33554432 & s))
                                        return 0 !== (16777216 & s) ? this._reject(o._reason()) : this._cancel();
                                    o = o._value()
                                }
                                if (o = u.asArray(o),
                                null === o) {
                                    var l = i("expecting an array or an iterable object but got " + u.classString(o)).reason();
                                    return void this._promise._rejectCallback(l, !1)
                                }
                                return 0 === o.length ? void (n === -5 ? this._resolveEmptyArray() : this._resolve(a(n))) : void this._iterate(o)
                            }
                            ,
                            s.prototype._iterate = function(e) {
                                var n = this.getActualLength(e.length);
                                this._length = n,
                                this._values = this.shouldCopyValues() ? new Array(n) : this._values;
                                for (var i = this._promise, o = !1, a = null, s = 0; s < n; ++s) {
                                    var u = r(e[s], i);
                                    u instanceof t ? (u = u._target(),
                                    a = u._bitField) : a = null,
                                    o ? null !== a && u.suppressUnhandledRejections() : null !== a ? 0 === (50397184 & a) ? (u._proxy(this, s),
                                    this._values[s] = u) : o = 0 !== (33554432 & a) ? this._promiseFulfilled(u._value(), s) : 0 !== (16777216 & a) ? this._promiseRejected(u._reason(), s) : this._promiseCancelled(s) : o = this._promiseFulfilled(u, s)
                                }
                                o || i._setAsyncGuaranteed()
                            }
                            ,
                            s.prototype._isResolved = function() {
                                return null === this._values
                            }
                            ,
                            s.prototype._resolve = function(e) {
                                this._values = null,
                                this._promise._fulfill(e)
                            }
                            ,
                            s.prototype._cancel = function() {
                                !this._isResolved() && this._promise._isCancellable() && (this._values = null,
                                this._promise._cancel())
                            }
                            ,
                            s.prototype._reject = function(e) {
                                this._values = null,
                                this._promise._rejectCallback(e, !1)
                            }
                            ,
                            s.prototype._promiseFulfilled = function(e, t) {
                                this._values[t] = e;
                                var n = ++this._totalResolved;
                                return n >= this._length && (this._resolve(this._values),
                                !0)
                            }
                            ,
                            s.prototype._promiseCancelled = function() {
                                return this._cancel(),
                                !0
                            }
                            ,
                            s.prototype._promiseRejected = function(e) {
                                return this._totalResolved++,
                                this._reject(e),
                                !0
                            }
                            ,
                            s.prototype._resultCancelled = function() {
                                if (!this._isResolved()) {
                                    var e = this._values;
                                    if (this._cancel(),
                                    e instanceof t)
                                        e.cancel();
                                    else
                                        for (var n = 0; n < e.length; ++n)
                                            e[n]instanceof t && e[n].cancel()
                                }
                            }
                            ,
                            s.prototype.shouldCopyValues = function() {
                                return !0
                            }
                            ,
                            s.prototype.getActualLength = function(e) {
                                return e
                            }
                            ,
                            s
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    24: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n) {
                            function r(e) {
                                return !S.test(e)
                            }
                            function i(e) {
                                try {
                                    return e.__isPromisified__ === !0
                                } catch (t) {
                                    return !1
                                }
                            }
                            function o(e, t, n) {
                                var r = p.getDataPropertyOrDefault(e, t + n, y);
                                return !!r && i(r)
                            }
                            function a(e, t, n) {
                                for (var r = 0; r < e.length; r += 2) {
                                    var i = e[r];
                                    if (n.test(i))
                                        for (var o = i.replace(n, ""), a = 0; a < e.length; a += 2)
                                            if (e[a] === o)
                                                throw new g("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", t))
                                }
                            }
                            function s(e, t, n, r) {
                                for (var s = p.inheritedDataKeys(e), u = [], c = 0; c < s.length; ++c) {
                                    var l = s[c]
                                      , h = e[l]
                                      , f = r === P || P(l, h, e);
                                    "function" != typeof h || i(h) || o(e, l, t) || !r(l, h, e, f) || u.push(l, h)
                                }
                                return a(u, t, n),
                                u
                            }
                            function u(e, r, i, o, a, s) {
                                function u() {
                                    var i = r;
                                    r === f && (i = this);
                                    var o = new t(n);
                                    o._captureStackTrace();
                                    var a = "string" == typeof l && this !== c ? this[l] : e
                                      , u = d(o, s);
                                    try {
                                        a.apply(i, v(arguments, u))
                                    } catch (h) {
                                        o._rejectCallback(_(h), !0, !0)
                                    }
                                    return o._isFateSealed() || o._setAsyncGuaranteed(),
                                    o
                                }
                                var c = function() {
                                    return this
                                }()
                                  , l = e;
                                return "string" == typeof l && (e = o),
                                p.notEnumerableProp(u, "__isPromisified__", !0),
                                u
                            }
                            function c(e, t, n, r, i) {
                                for (var o = new RegExp(E(t) + "$"), a = s(e, t, o, n), u = 0, c = a.length; u < c; u += 2) {
                                    var l = a[u]
                                      , h = a[u + 1]
                                      , d = l + t;
                                    if (r === A)
                                        e[d] = A(l, f, l, h, t, i);
                                    else {
                                        var v = r(h, function() {
                                            return A(l, f, l, h, t, i)
                                        });
                                        p.notEnumerableProp(v, "__isPromisified__", !0),
                                        e[d] = v
                                    }
                                }
                                return p.toFastProperties(e),
                                e
                            }
                            function l(e, t, n) {
                                return A(e, t, void 0, e, null, n)
                            }
                            var h, f = {}, p = e("./util"), d = e("./nodeback"), v = p.withAppended, _ = p.maybeWrapAsError, m = p.canEvaluate, g = e("./errors").TypeError, T = "Async", y = {
                                __isPromisified__: !0
                            }, b = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"], S = new RegExp("^(?:" + b.join("|") + ")$"), P = function(e) {
                                return p.isIdentifier(e) && "_" !== e.charAt(0) && "constructor" !== e
                            }, E = function(e) {
                                return e.replace(/([$])/, "\\$")
                            }, A = m ? h : u;
                            t.promisify = function(e, t) {
                                if ("function" != typeof e)
                                    throw new g("expecting a function but got " + p.classString(e));
                                if (i(e))
                                    return e;
                                t = Object(t);
                                var n = void 0 === t.context ? f : t.context
                                  , o = !!t.multiArgs
                                  , a = l(e, n, o);
                                return p.copyDescriptors(e, a, r),
                                a
                            }
                            ,
                            t.promisifyAll = function(e, t) {
                                if ("function" != typeof e && "object" != typeof e)
                                    throw new g("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                                t = Object(t);
                                var n = !!t.multiArgs
                                  , r = t.suffix;
                                "string" != typeof r && (r = T);
                                var i = t.filter;
                                "function" != typeof i && (i = P);
                                var o = t.promisifier;
                                if ("function" != typeof o && (o = A),
                                !p.isIdentifier(r))
                                    throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                                for (var a = p.inheritedDataKeys(e), s = 0; s < a.length; ++s) {
                                    var u = e[a[s]];
                                    "constructor" !== a[s] && p.isClass(u) && (c(u.prototype, r, i, o, n),
                                    c(u, r, i, o, n))
                                }
                                return c(e, r, i, o, n)
                            }
                        }
                    }
                    , {
                        "./errors": 12,
                        "./nodeback": 20,
                        "./util": 36
                    }],
                    25: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i) {
                            function o(e) {
                                var t, n = !1;
                                if (void 0 !== s && e instanceof s)
                                    t = h(e),
                                    n = !0;
                                else {
                                    var r = l.keys(e)
                                      , i = r.length;
                                    t = new Array(2 * i);
                                    for (var o = 0; o < i; ++o) {
                                        var a = r[o];
                                        t[o] = e[a],
                                        t[o + i] = a
                                    }
                                }
                                this.constructor$(t),
                                this._isMap = n,
                                this._init$(void 0, -3)
                            }
                            function a(e) {
                                var n, a = r(e);
                                return c(a) ? (n = a instanceof t ? a._then(t.props, void 0, void 0, void 0, void 0) : new o(a).promise(),
                                a instanceof t && n._propagateFrom(a, 2),
                                n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")
                            }
                            var s, u = e("./util"), c = u.isObject, l = e("./es5");
                            "function" == typeof Map && (s = Map);
                            var h = function() {
                                function e(e, r) {
                                    this[t] = e,
                                    this[t + n] = r,
                                    t++
                                }
                                var t = 0
                                  , n = 0;
                                return function(r) {
                                    n = r.size,
                                    t = 0;
                                    var i = new Array(2 * r.size);
                                    return r.forEach(e, i),
                                    i
                                }
                            }()
                              , f = function(e) {
                                for (var t = new s, n = e.length / 2 | 0, r = 0; r < n; ++r) {
                                    var i = e[n + r]
                                      , o = e[r];
                                    t.set(i, o)
                                }
                                return t
                            };
                            u.inherits(o, n),
                            o.prototype._init = function() {}
                            ,
                            o.prototype._promiseFulfilled = function(e, t) {
                                this._values[t] = e;
                                var n = ++this._totalResolved;
                                if (n >= this._length) {
                                    var r;
                                    if (this._isMap)
                                        r = f(this._values);
                                    else {
                                        r = {};
                                        for (var i = this.length(), o = 0, a = this.length(); o < a; ++o)
                                            r[this._values[o + i]] = this._values[o]
                                    }
                                    return this._resolve(r),
                                    !0
                                }
                                return !1
                            }
                            ,
                            o.prototype.shouldCopyValues = function() {
                                return !1
                            }
                            ,
                            o.prototype.getActualLength = function(e) {
                                return e >> 1
                            }
                            ,
                            t.prototype.props = function() {
                                return a(this)
                            }
                            ,
                            t.props = function(e) {
                                return a(e)
                            }
                        }
                    }
                    , {
                        "./es5": 13,
                        "./util": 36
                    }],
                    26: [function(e, t, n) {
                        "use strict";
                        function r(e, t, n, r, i) {
                            for (var o = 0; o < i; ++o)
                                n[o + r] = e[o + t],
                                e[o + t] = void 0
                        }
                        function i(e) {
                            this._capacity = e,
                            this._length = 0,
                            this._front = 0
                        }
                        i.prototype._willBeOverCapacity = function(e) {
                            return this._capacity < e
                        }
                        ,
                        i.prototype._pushOne = function(e) {
                            var t = this.length();
                            this._checkCapacity(t + 1);
                            var n = this._front + t & this._capacity - 1;
                            this[n] = e,
                            this._length = t + 1
                        }
                        ,
                        i.prototype._unshiftOne = function(e) {
                            var t = this._capacity;
                            this._checkCapacity(this.length() + 1);
                            var n = this._front
                              , r = (n - 1 & t - 1 ^ t) - t;
                            this[r] = e,
                            this._front = r,
                            this._length = this.length() + 1
                        }
                        ,
                        i.prototype.unshift = function(e, t, n) {
                            this._unshiftOne(n),
                            this._unshiftOne(t),
                            this._unshiftOne(e)
                        }
                        ,
                        i.prototype.push = function(e, t, n) {
                            var r = this.length() + 3;
                            if (this._willBeOverCapacity(r))
                                return this._pushOne(e),
                                this._pushOne(t),
                                void this._pushOne(n);
                            var i = this._front + r - 3;
                            this._checkCapacity(r);
                            var o = this._capacity - 1;
                            this[i + 0 & o] = e,
                            this[i + 1 & o] = t,
                            this[i + 2 & o] = n,
                            this._length = r
                        }
                        ,
                        i.prototype.shift = function() {
                            var e = this._front
                              , t = this[e];
                            return this[e] = void 0,
                            this._front = e + 1 & this._capacity - 1,
                            this._length--,
                            t
                        }
                        ,
                        i.prototype.length = function() {
                            return this._length
                        }
                        ,
                        i.prototype._checkCapacity = function(e) {
                            this._capacity < e && this._resizeTo(this._capacity << 1)
                        }
                        ,
                        i.prototype._resizeTo = function(e) {
                            var t = this._capacity;
                            this._capacity = e;
                            var n = this._front
                              , i = this._length
                              , o = n + i & t - 1;
                            r(this, 0, this, t, o)
                        }
                        ,
                        t.exports = i
                    }
                    , {}],
                    27: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i) {
                            function o(e, o) {
                                var u = r(e);
                                if (u instanceof t)
                                    return s(u);
                                if (e = a.asArray(e),
                                null === e)
                                    return i("expecting an array or an iterable object but got " + a.classString(e));
                                var c = new t(n);
                                void 0 !== o && c._propagateFrom(o, 3);
                                for (var l = c._fulfill, h = c._reject, f = 0, p = e.length; f < p; ++f) {
                                    var d = e[f];
                                    (void 0 !== d || f in e) && t.cast(d)._then(l, h, void 0, c, null)
                                }
                                return c
                            }
                            var a = e("./util")
                              , s = function(e) {
                                return e.then(function(t) {
                                    return o(t, e)
                                })
                            };
                            t.race = function(e) {
                                return o(e, void 0)
                            }
                            ,
                            t.prototype.race = function() {
                                return o(this, void 0)
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    28: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i, o, a) {
                            function s(e, n, r, i) {
                                this.constructor$(e);
                                var a = f();
                                this._fn = null === a ? n : p.domainBind(a, n),
                                void 0 !== r && (r = t.resolve(r),
                                r._attachCancellationCallback(this)),
                                this._initialValue = r,
                                this._currentCancellable = null,
                                i === o ? this._eachValues = Array(this._length) : 0 === i ? this._eachValues = null : this._eachValues = void 0,
                                this._promise._captureStackTrace(),
                                this._init$(void 0, -5)
                            }
                            function u(e, t) {
                                this.isFulfilled() ? t._resolve(e) : t._reject(e)
                            }
                            function c(e, t, n, i) {
                                if ("function" != typeof t)
                                    return r("expecting a function but got " + p.classString(t));
                                var o = new s(e,t,n,i);
                                return o.promise()
                            }
                            function l(e) {
                                this.accum = e,
                                this.array._gotAccum(e);
                                var n = i(this.value, this.array._promise);
                                return n instanceof t ? (this.array._currentCancellable = n,
                                n._then(h, void 0, void 0, this, void 0)) : h.call(this, n)
                            }
                            function h(e) {
                                var n = this.array
                                  , r = n._promise
                                  , i = d(n._fn);
                                r._pushContext();
                                var o;
                                o = void 0 !== n._eachValues ? i.call(r._boundValue(), e, this.index, this.length) : i.call(r._boundValue(), this.accum, e, this.index, this.length),
                                o instanceof t && (n._currentCancellable = o);
                                var s = r._popContext();
                                return a.checkForgottenReturns(o, s, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r),
                                o
                            }
                            var f = t._getDomain
                              , p = e("./util")
                              , d = p.tryCatch;
                            p.inherits(s, n),
                            s.prototype._gotAccum = function(e) {
                                void 0 !== this._eachValues && null !== this._eachValues && e !== o && this._eachValues.push(e)
                            }
                            ,
                            s.prototype._eachComplete = function(e) {
                                return null !== this._eachValues && this._eachValues.push(e),
                                this._eachValues
                            }
                            ,
                            s.prototype._init = function() {}
                            ,
                            s.prototype._resolveEmptyArray = function() {
                                this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue)
                            }
                            ,
                            s.prototype.shouldCopyValues = function() {
                                return !1
                            }
                            ,
                            s.prototype._resolve = function(e) {
                                this._promise._resolveCallback(e),
                                this._values = null
                            }
                            ,
                            s.prototype._resultCancelled = function(e) {
                                return e === this._initialValue ? this._cancel() : void (this._isResolved() || (this._resultCancelled$(),
                                this._currentCancellable instanceof t && this._currentCancellable.cancel(),
                                this._initialValue instanceof t && this._initialValue.cancel()))
                            }
                            ,
                            s.prototype._iterate = function(e) {
                                this._values = e;
                                var n, r, i = e.length;
                                if (void 0 !== this._initialValue ? (n = this._initialValue,
                                r = 0) : (n = t.resolve(e[0]),
                                r = 1),
                                this._currentCancellable = n,
                                !n.isRejected())
                                    for (; r < i; ++r) {
                                        var o = {
                                            accum: null,
                                            value: e[r],
                                            index: r,
                                            length: i,
                                            array: this
                                        };
                                        n = n._then(l, void 0, void 0, o, void 0)
                                    }
                                void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)),
                                n._then(u, u, void 0, n, this)
                            }
                            ,
                            t.prototype.reduce = function(e, t) {
                                return c(this, e, t, null)
                            }
                            ,
                            t.reduce = function(e, t, n, r) {
                                return c(e, t, n, r)
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    29: [function(t, n, i) {
                        "use strict";
                        var o, a = t("./util"), s = function() {
                            throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
                        }, u = a.getNativePromise();
                        if (a.isNode && "undefined" == typeof MutationObserver) {
                            var c = r.setImmediate
                              , l = e.nextTick;
                            o = a.isRecentNode ? function(e) {
                                c.call(r, e)
                            }
                            : function(t) {
                                l.call(e, t)
                            }
                        } else if ("function" == typeof u && "function" == typeof u.resolve) {
                            var h = u.resolve();
                            o = function(e) {
                                h.then(e)
                            }
                        } else
                            o = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? "undefined" != typeof setImmediate ? function(e) {
                                setImmediate(e)
                            }
                            : "undefined" != typeof setTimeout ? function(e) {
                                setTimeout(e, 0)
                            }
                            : s : function() {
                                var e = document.createElement("div")
                                  , t = {
                                    attributes: !0
                                }
                                  , n = !1
                                  , r = document.createElement("div")
                                  , i = new MutationObserver(function() {
                                    e.classList.toggle("foo"),
                                    n = !1
                                }
                                );
                                i.observe(r, t);
                                var o = function() {
                                    n || (n = !0,
                                    r.classList.toggle("foo"))
                                };
                                return function(n) {
                                    var r = new MutationObserver(function() {
                                        r.disconnect(),
                                        n()
                                    }
                                    );
                                    r.observe(e, t),
                                    o()
                                }
                            }();
                        n.exports = o
                    }
                    , {
                        "./util": 36
                    }],
                    30: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r) {
                            function i(e) {
                                this.constructor$(e)
                            }
                            var o = t.PromiseInspection
                              , a = e("./util");
                            a.inherits(i, n),
                            i.prototype._promiseResolved = function(e, t) {
                                this._values[e] = t;
                                var n = ++this._totalResolved;
                                return n >= this._length && (this._resolve(this._values),
                                !0)
                            }
                            ,
                            i.prototype._promiseFulfilled = function(e, t) {
                                var n = new o;
                                return n._bitField = 33554432,
                                n._settledValueField = e,
                                this._promiseResolved(t, n)
                            }
                            ,
                            i.prototype._promiseRejected = function(e, t) {
                                var n = new o;
                                return n._bitField = 16777216,
                                n._settledValueField = e,
                                this._promiseResolved(t, n)
                            }
                            ,
                            t.settle = function(e) {
                                return r.deprecated(".settle()", ".reflect()"),
                                new i(e).promise();
                            }
                            ,
                            t.prototype.settle = function() {
                                return t.settle(this)
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    31: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r) {
                            function i(e) {
                                this.constructor$(e),
                                this._howMany = 0,
                                this._unwrap = !1,
                                this._initialized = !1
                            }
                            function o(e, t) {
                                if ((0 | t) !== t || t < 0)
                                    return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                                var n = new i(e)
                                  , o = n.promise();
                                return n.setHowMany(t),
                                n.init(),
                                o
                            }
                            var a = e("./util")
                              , s = e("./errors").RangeError
                              , u = e("./errors").AggregateError
                              , c = a.isArray
                              , l = {};
                            a.inherits(i, n),
                            i.prototype._init = function() {
                                if (this._initialized) {
                                    if (0 === this._howMany)
                                        return void this._resolve([]);
                                    this._init$(void 0, -5);
                                    var e = c(this._values);
                                    !this._isResolved() && e && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))
                                }
                            }
                            ,
                            i.prototype.init = function() {
                                this._initialized = !0,
                                this._init()
                            }
                            ,
                            i.prototype.setUnwrap = function() {
                                this._unwrap = !0
                            }
                            ,
                            i.prototype.howMany = function() {
                                return this._howMany
                            }
                            ,
                            i.prototype.setHowMany = function(e) {
                                this._howMany = e
                            }
                            ,
                            i.prototype._promiseFulfilled = function(e) {
                                return this._addFulfilled(e),
                                this._fulfilled() === this.howMany() && (this._values.length = this.howMany(),
                                1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values),
                                !0)
                            }
                            ,
                            i.prototype._promiseRejected = function(e) {
                                return this._addRejected(e),
                                this._checkOutcome()
                            }
                            ,
                            i.prototype._promiseCancelled = function() {
                                return this._values instanceof t || null == this._values ? this._cancel() : (this._addRejected(l),
                                this._checkOutcome())
                            }
                            ,
                            i.prototype._checkOutcome = function() {
                                if (this.howMany() > this._canPossiblyFulfill()) {
                                    for (var e = new u, t = this.length(); t < this._values.length; ++t)
                                        this._values[t] !== l && e.push(this._values[t]);
                                    return e.length > 0 ? this._reject(e) : this._cancel(),
                                    !0
                                }
                                return !1
                            }
                            ,
                            i.prototype._fulfilled = function() {
                                return this._totalResolved
                            }
                            ,
                            i.prototype._rejected = function() {
                                return this._values.length - this.length()
                            }
                            ,
                            i.prototype._addRejected = function(e) {
                                this._values.push(e)
                            }
                            ,
                            i.prototype._addFulfilled = function(e) {
                                this._values[this._totalResolved++] = e
                            }
                            ,
                            i.prototype._canPossiblyFulfill = function() {
                                return this.length() - this._rejected()
                            }
                            ,
                            i.prototype._getRangeError = function(e) {
                                var t = "Input array must contain at least " + this._howMany + " items but contains only " + e + " items";
                                return new s(t)
                            }
                            ,
                            i.prototype._resolveEmptyArray = function() {
                                this._reject(this._getRangeError(0))
                            }
                            ,
                            t.some = function(e, t) {
                                return o(e, t)
                            }
                            ,
                            t.prototype.some = function(e) {
                                return o(this, e)
                            }
                            ,
                            t._SomePromiseArray = i
                        }
                    }
                    , {
                        "./errors": 12,
                        "./util": 36
                    }],
                    32: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e) {
                            function t(e) {
                                void 0 !== e ? (e = e._target(),
                                this._bitField = e._bitField,
                                this._settledValueField = e._isFateSealed() ? e._settledValue() : void 0) : (this._bitField = 0,
                                this._settledValueField = void 0)
                            }
                            t.prototype._settledValue = function() {
                                return this._settledValueField
                            }
                            ;
                            var n = t.prototype.value = function() {
                                if (!this.isFulfilled())
                                    throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                                return this._settledValue()
                            }
                              , r = t.prototype.error = t.prototype.reason = function() {
                                if (!this.isRejected())
                                    throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                                return this._settledValue()
                            }
                              , i = t.prototype.isFulfilled = function() {
                                return 0 !== (33554432 & this._bitField)
                            }
                              , o = t.prototype.isRejected = function() {
                                return 0 !== (16777216 & this._bitField)
                            }
                              , a = t.prototype.isPending = function() {
                                return 0 === (50397184 & this._bitField)
                            }
                              , s = t.prototype.isResolved = function() {
                                return 0 !== (50331648 & this._bitField)
                            }
                            ;
                            t.prototype.isCancelled = function() {
                                return 0 !== (8454144 & this._bitField)
                            }
                            ,
                            e.prototype.__isCancelled = function() {
                                return 65536 === (65536 & this._bitField)
                            }
                            ,
                            e.prototype._isCancelled = function() {
                                return this._target().__isCancelled()
                            }
                            ,
                            e.prototype.isCancelled = function() {
                                return 0 !== (8454144 & this._target()._bitField)
                            }
                            ,
                            e.prototype.isPending = function() {
                                return a.call(this._target())
                            }
                            ,
                            e.prototype.isRejected = function() {
                                return o.call(this._target())
                            }
                            ,
                            e.prototype.isFulfilled = function() {
                                return i.call(this._target())
                            }
                            ,
                            e.prototype.isResolved = function() {
                                return s.call(this._target())
                            }
                            ,
                            e.prototype.value = function() {
                                return n.call(this._target())
                            }
                            ,
                            e.prototype.reason = function() {
                                var e = this._target();
                                return e._unsetRejectionIsUnhandled(),
                                r.call(e)
                            }
                            ,
                            e.prototype._value = function() {
                                return this._settledValue()
                            }
                            ,
                            e.prototype._reason = function() {
                                return this._unsetRejectionIsUnhandled(),
                                this._settledValue()
                            }
                            ,
                            e.PromiseInspection = t
                        }
                    }
                    , {}],
                    33: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n) {
                            function r(e, r) {
                                if (l(e)) {
                                    if (e instanceof t)
                                        return e;
                                    var i = o(e);
                                    if (i === c) {
                                        r && r._pushContext();
                                        var u = t.reject(i.e);
                                        return r && r._popContext(),
                                        u
                                    }
                                    if ("function" == typeof i) {
                                        if (a(e)) {
                                            var u = new t(n);
                                            return e._then(u._fulfill, u._reject, void 0, u, null),
                                            u
                                        }
                                        return s(e, i, r)
                                    }
                                }
                                return e
                            }
                            function i(e) {
                                return e.then
                            }
                            function o(e) {
                                try {
                                    return i(e)
                                } catch (t) {
                                    return c.e = t,
                                    c
                                }
                            }
                            function a(e) {
                                try {
                                    return h.call(e, "_promise0")
                                } catch (t) {
                                    return !1
                                }
                            }
                            function s(e, r, i) {
                                function o(e) {
                                    s && (s._resolveCallback(e),
                                    s = null)
                                }
                                function a(e) {
                                    s && (s._rejectCallback(e, h, !0),
                                    s = null)
                                }
                                var s = new t(n)
                                  , l = s;
                                i && i._pushContext(),
                                s._captureStackTrace(),
                                i && i._popContext();
                                var h = !0
                                  , f = u.tryCatch(r).call(e, o, a);
                                return h = !1,
                                s && f === c && (s._rejectCallback(f.e, !0, !0),
                                s = null),
                                l
                            }
                            var u = e("./util")
                              , c = u.errorObj
                              , l = u.isObject
                              , h = {}.hasOwnProperty;
                            return r
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    34: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r) {
                            function i(e) {
                                this.handle = e
                            }
                            function o(e) {
                                return clearTimeout(this.handle),
                                e
                            }
                            function a(e) {
                                throw clearTimeout(this.handle),
                                e
                            }
                            var s = e("./util")
                              , u = t.TimeoutError;
                            i.prototype._resultCancelled = function() {
                                clearTimeout(this.handle)
                            }
                            ;
                            var c = function(e) {
                                return l(+this).thenReturn(e)
                            }
                              , l = t.delay = function(e, o) {
                                var a, s;
                                return void 0 !== o ? (a = t.resolve(o)._then(c, null, null, e, void 0),
                                r.cancellation() && o instanceof t && a._setOnCancel(o)) : (a = new t(n),
                                s = setTimeout(function() {
                                    a._fulfill()
                                }, +e),
                                r.cancellation() && a._setOnCancel(new i(s)),
                                a._captureStackTrace()),
                                a._setAsyncGuaranteed(),
                                a
                            }
                            ;
                            t.prototype.delay = function(e) {
                                return l(e, this)
                            }
                            ;
                            var h = function(e, t, n) {
                                var r;
                                r = "string" != typeof t ? t instanceof Error ? t : new u("operation timed out") : new u(t),
                                s.markAsOriginatingFromRejection(r),
                                e._attachExtraTrace(r),
                                e._reject(r),
                                null != n && n.cancel()
                            };
                            t.prototype.timeout = function(e, t) {
                                e = +e;
                                var n, s, u = new i(setTimeout(function() {
                                    n.isPending() && h(n, t, s)
                                }, e));
                                return r.cancellation() ? (s = this.then(),
                                n = s._then(o, a, void 0, u, void 0),
                                n._setOnCancel(u)) : n = this._then(o, a, void 0, u, void 0),
                                n
                            }
                        }
                    }
                    , {
                        "./util": 36
                    }],
                    35: [function(e, t, n) {
                        "use strict";
                        t.exports = function(t, n, r, i, o, a) {
                            function s(e) {
                                setTimeout(function() {
                                    throw e
                                }, 0)
                            }
                            function u(e) {
                                var t = r(e);
                                return t !== e && "function" == typeof e._isDisposable && "function" == typeof e._getDisposer && e._isDisposable() && t._setDisposable(e._getDisposer()),
                                t
                            }
                            function c(e, n) {
                                function i() {
                                    if (a >= c)
                                        return l._fulfill();
                                    var o = u(e[a++]);
                                    if (o instanceof t && o._isDisposable()) {
                                        try {
                                            o = r(o._getDisposer().tryDispose(n), e.promise)
                                        } catch (h) {
                                            return s(h)
                                        }
                                        if (o instanceof t)
                                            return o._then(i, s, null, null, null)
                                    }
                                    i()
                                }
                                var a = 0
                                  , c = e.length
                                  , l = new t(o);
                                return i(),
                                l
                            }
                            function l(e, t, n) {
                                this._data = e,
                                this._promise = t,
                                this._context = n
                            }
                            function h(e, t, n) {
                                this.constructor$(e, t, n)
                            }
                            function f(e) {
                                return l.isDisposer(e) ? (this.resources[this.index]._setDisposable(e),
                                e.promise()) : e
                            }
                            function p(e) {
                                this.length = e,
                                this.promise = null,
                                this[e - 1] = null
                            }
                            var d = e("./util")
                              , v = e("./errors").TypeError
                              , _ = e("./util").inherits
                              , m = d.errorObj
                              , g = d.tryCatch
                              , T = {};
                            l.prototype.data = function() {
                                return this._data
                            }
                            ,
                            l.prototype.promise = function() {
                                return this._promise
                            }
                            ,
                            l.prototype.resource = function() {
                                return this.promise().isFulfilled() ? this.promise().value() : T
                            }
                            ,
                            l.prototype.tryDispose = function(e) {
                                var t = this.resource()
                                  , n = this._context;
                                void 0 !== n && n._pushContext();
                                var r = t !== T ? this.doDispose(t, e) : null;
                                return void 0 !== n && n._popContext(),
                                this._promise._unsetDisposable(),
                                this._data = null,
                                r
                            }
                            ,
                            l.isDisposer = function(e) {
                                return null != e && "function" == typeof e.resource && "function" == typeof e.tryDispose
                            }
                            ,
                            _(h, l),
                            h.prototype.doDispose = function(e, t) {
                                var n = this.data();
                                return n.call(e, e, t)
                            }
                            ,
                            p.prototype._resultCancelled = function() {
                                for (var e = this.length, n = 0; n < e; ++n) {
                                    var r = this[n];
                                    r instanceof t && r.cancel()
                                }
                            }
                            ,
                            t.using = function() {
                                var e = arguments.length;
                                if (e < 2)
                                    return n("you must pass at least 2 arguments to Promise.using");
                                var i = arguments[e - 1];
                                if ("function" != typeof i)
                                    return n("expecting a function but got " + d.classString(i));
                                var o, s = !0;
                                2 === e && Array.isArray(arguments[0]) ? (o = arguments[0],
                                e = o.length,
                                s = !1) : (o = arguments,
                                e--);
                                for (var u = new p(e), h = 0; h < e; ++h) {
                                    var v = o[h];
                                    if (l.isDisposer(v)) {
                                        var _ = v;
                                        v = v.promise(),
                                        v._setDisposable(_)
                                    } else {
                                        var T = r(v);
                                        T instanceof t && (v = T._then(f, null, null, {
                                            resources: u,
                                            index: h
                                        }, void 0))
                                    }
                                    u[h] = v
                                }
                                for (var y = new Array(u.length), h = 0; h < y.length; ++h)
                                    y[h] = t.resolve(u[h]).reflect();
                                var b = t.all(y).then(function(e) {
                                    for (var t = 0; t < e.length; ++t) {
                                        var n = e[t];
                                        if (n.isRejected())
                                            return m.e = n.error(),
                                            m;
                                        if (!n.isFulfilled())
                                            return void b.cancel();
                                        e[t] = n.value()
                                    }
                                    S._pushContext(),
                                    i = g(i);
                                    var r = s ? i.apply(void 0, e) : i(e)
                                      , o = S._popContext();
                                    return a.checkForgottenReturns(r, o, "Promise.using", S),
                                    r
                                })
                                  , S = b.lastly(function() {
                                    var e = new t.PromiseInspection(b);
                                    return c(u, e)
                                });
                                return u.promise = S,
                                S._setOnCancel(u),
                                S
                            }
                            ,
                            t.prototype._setDisposable = function(e) {
                                this._bitField = 131072 | this._bitField,
                                this._disposer = e
                            }
                            ,
                            t.prototype._isDisposable = function() {
                                return (131072 & this._bitField) > 0
                            }
                            ,
                            t.prototype._getDisposer = function() {
                                return this._disposer
                            }
                            ,
                            t.prototype._unsetDisposable = function() {
                                this._bitField = this._bitField & -131073,
                                this._disposer = void 0
                            }
                            ,
                            t.prototype.disposer = function(e) {
                                if ("function" == typeof e)
                                    return new h(e,this,i());
                                throw new v
                            }
                        }
                    }
                    , {
                        "./errors": 12,
                        "./util": 36
                    }],
                    36: [function(t, n, i) {
                        "use strict";
                        function o() {
                            try {
                                var e = H;
                                return H = null,
                                e.apply(this, arguments)
                            } catch (t) {
                                return R.e = t,
                                R
                            }
                        }
                        function a(e) {
                            return H = e,
                            o
                        }
                        function s(e) {
                            return null == e || e === !0 || e === !1 || "string" == typeof e || "number" == typeof e
                        }
                        function u(e) {
                            return "function" == typeof e || "object" == typeof e && null !== e
                        }
                        function c(e) {
                            return s(e) ? new Error(g(e)) : e
                        }
                        function l(e, t) {
                            var n, r = e.length, i = new Array(r + 1);
                            for (n = 0; n < r; ++n)
                                i[n] = e[n];
                            return i[n] = t,
                            i
                        }
                        function h(e, t, n) {
                            if (!x.isES5)
                                return {}.hasOwnProperty.call(e, t) ? e[t] : void 0;
                            var r = Object.getOwnPropertyDescriptor(e, t);
                            return null != r ? null == r.get && null == r.set ? r.value : n : void 0
                        }
                        function f(e, t, n) {
                            if (s(e))
                                return e;
                            var r = {
                                value: n,
                                configurable: !0,
                                enumerable: !1,
                                writable: !0
                            };
                            return x.defineProperty(e, t, r),
                            e
                        }
                        function p(e) {
                            throw e
                        }
                        function d(e) {
                            try {
                                if ("function" == typeof e) {
                                    var t = x.names(e.prototype)
                                      , n = x.isES5 && t.length > 1
                                      , r = t.length > 0 && !(1 === t.length && "constructor" === t[0])
                                      , i = O.test(e + "") && x.names(e).length > 0;
                                    if (n || r || i)
                                        return !0
                                }
                                return !1
                            } catch (o) {
                                return !1
                            }
                        }
                        function v(e) {
                            function t() {}
                            t.prototype = e;
                            for (var n = 8; n--; )
                                new t;
                            return e
                        }
                        function _(e) {
                            return I.test(e)
                        }
                        function m(e, t, n) {
                            for (var r = new Array(e), i = 0; i < e; ++i)
                                r[i] = t + i + n;
                            return r
                        }
                        function g(e) {
                            try {
                                return e + ""
                            } catch (t) {
                                return "[no string representation]"
                            }
                        }
                        function T(e) {
                            return null !== e && "object" == typeof e && "string" == typeof e.message && "string" == typeof e.name
                        }
                        function y(e) {
                            try {
                                f(e, "isOperational", !0)
                            } catch (t) {}
                        }
                        function b(e) {
                            return null != e && (e instanceof Error.__BluebirdErrorTypes__.OperationalError || e.isOperational === !0)
                        }
                        function S(e) {
                            return T(e) && x.propertyIsWritable(e, "stack")
                        }
                        function P(e) {
                            return {}.toString.call(e)
                        }
                        function E(e, t, n) {
                            for (var r = x.names(e), i = 0; i < r.length; ++i) {
                                var o = r[i];
                                if (n(o))
                                    try {
                                        x.defineProperty(t, o, x.getDescriptor(e, o))
                                    } catch (a) {}
                            }
                        }
                        function A(t, n) {
                            return F ? e.env[t] : n
                        }
                        function w() {
                            if ("function" == typeof Promise)
                                try {
                                    var e = new Promise(function() {}
                                    );
                                    if ("[object Promise]" === {}.toString.call(e))
                                        return Promise
                                } catch (t) {}
                        }
                        function M(e, t) {
                            return e.bind(t)
                        }
                        var x = t("./es5"), C = "undefined" == typeof navigator, R = {
                            e: {}
                        }, H, j = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof r ? r : void 0 !== this ? this : null, L = function(e, t) {
                            function n() {
                                this.constructor = e,
                                this.constructor$ = t;
                                for (var n in t.prototype)
                                    r.call(t.prototype, n) && "$" !== n.charAt(n.length - 1) && (this[n + "$"] = t.prototype[n])
                            }
                            var r = {}.hasOwnProperty;
                            return n.prototype = t.prototype,
                            e.prototype = new n,
                            e.prototype
                        }, G = function() {
                            var e = [Array.prototype, Object.prototype, Function.prototype]
                              , t = function(t) {
                                for (var n = 0; n < e.length; ++n)
                                    if (e[n] === t)
                                        return !0;
                                return !1
                            };
                            if (x.isES5) {
                                var n = Object.getOwnPropertyNames;
                                return function(e) {
                                    for (var r = [], i = Object.create(null); null != e && !t(e); ) {
                                        var o;
                                        try {
                                            o = n(e)
                                        } catch (a) {
                                            return r
                                        }
                                        for (var s = 0; s < o.length; ++s) {
                                            var u = o[s];
                                            if (!i[u]) {
                                                i[u] = !0;
                                                var c = Object.getOwnPropertyDescriptor(e, u);
                                                null != c && null == c.get && null == c.set && r.push(u)
                                            }
                                        }
                                        e = x.getPrototypeOf(e)
                                    }
                                    return r
                                }
                            }
                            var r = {}.hasOwnProperty;
                            return function(n) {
                                if (t(n))
                                    return [];
                                var i = [];
                                e: for (var o in n)
                                    if (r.call(n, o))
                                        i.push(o);
                                    else {
                                        for (var a = 0; a < e.length; ++a)
                                            if (r.call(e[a], o))
                                                continue e;
                                        i.push(o)
                                    }
                                return i
                            }
                        }(), O = /this\s*\.\s*\S+\s*=/, I = /^[a-z$_][a-z$_0-9]*$/i, B = function() {
                            return "stack"in new Error ? function(e) {
                                return S(e) ? e : new Error(g(e))
                            }
                            : function(e) {
                                if (S(e))
                                    return e;
                                try {
                                    throw new Error(g(e))
                                } catch (t) {
                                    return t
                                }
                            }
                        }(), D = function(e) {
                            return x.isArray(e) ? e : null
                        };
                        if ("undefined" != typeof Symbol && Symbol.iterator) {
                            var N = "function" == typeof Array.from ? function(e) {
                                return Array.from(e)
                            }
                            : function(e) {
                                for (var t, n = [], r = e[Symbol.iterator](); !(t = r.next()).done; )
                                    n.push(t.value);
                                return n
                            }
                            ;
                            D = function(e) {
                                return x.isArray(e) ? e : null != e && "function" == typeof e[Symbol.iterator] ? N(e) : null
                            }
                        }
                        var F = "undefined" != typeof e && "[object process]" === P(e).toLowerCase()
                          , k = {
                            isClass: d,
                            isIdentifier: _,
                            inheritedDataKeys: G,
                            getDataPropertyOrDefault: h,
                            thrower: p,
                            isArray: x.isArray,
                            asArray: D,
                            notEnumerableProp: f,
                            isPrimitive: s,
                            isObject: u,
                            isError: T,
                            canEvaluate: C,
                            errorObj: R,
                            tryCatch: a,
                            inherits: L,
                            withAppended: l,
                            maybeWrapAsError: c,
                            toFastProperties: v,
                            filledRange: m,
                            toString: g,
                            canAttachTrace: S,
                            ensureErrorObject: B,
                            originatesFromRejection: b,
                            markAsOriginatingFromRejection: y,
                            classString: P,
                            copyDescriptors: E,
                            hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
                            isNode: F,
                            env: A,
                            global: j,
                            getNativePromise: w,
                            domainBind: M
                        };
                        k.isRecentNode = k.isNode && function() {
                            var t = e.versions.node.split(".").map(Number);
                            return 0 === t[0] && t[1] > 10 || t[0] > 0
                        }(),
                        k.isNode && k.toFastProperties(e);
                        try {
                            throw new Error
                        } catch (V) {
                            k.lastLineError = V
                        }
                        n.exports = k
                    }
                    , {
                        "./es5": 13
                    }]
                }, {}, [4])(4)
            }),
            "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise)
        }
        ).call(this, e("30"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        30: 30
    }],
    23: [function(e, t, n) {
        function r(e) {
            return i.test(e)
        }
        t.exports = r;
        var i = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
    }
    , {}],
    24: [function(e, t, n) {
        var r = e("29")
          , i = e("26")
          , o = e("21")
          , a = e("23")
          , n = t.exports = function() {
            var e = o(arguments).map(u);
            return s(e[0]) ? i.apply(i, e) : r.join.apply(r, e)
        }
          , s = n.isUrl = function(e) {
            return a(e) || "http://" === e || "https://" === e || "ftp://" === e
        }
          , u = n.replaceUndefined = function(e, t, n) {
            return void 0 === e || null === e ? s(n[0]) ? "/" : r.sep : e
        }
    }
    , {
        21: 21,
        23: 23,
        26: 26,
        29: 29
    }],
    25: [function(e, t, n) {
        (function(e) {
            (function() {
                function r(e, t) {
                    if (e !== t) {
                        var n = null === e
                          , r = e === A
                          , i = e === e
                          , o = null === t
                          , a = t === A
                          , s = t === t;
                        if (e > t && !o || !i || n && !a && s || r && s)
                            return 1;
                        if (e < t && !n || !s || o && !r && i || a && i)
                            return -1
                    }
                    return 0
                }
                function i(e, t, n) {
                    for (var r = e.length, i = n ? r : -1; n ? i-- : ++i < r; )
                        if (t(e[i], i, e))
                            return i;
                    return -1
                }
                function o(e, t, n) {
                    if (t !== t)
                        return _(e, n);
                    for (var r = n - 1, i = e.length; ++r < i; )
                        if (e[r] === t)
                            return r;
                    return -1
                }
                function a(e) {
                    return "function" == typeof e || !1
                }
                function s(e) {
                    return null == e ? "" : e + ""
                }
                function u(e, t) {
                    for (var n = -1, r = e.length; ++n < r && t.indexOf(e.charAt(n)) > -1; )
                        ;
                    return n
                }
                function c(e, t) {
                    for (var n = e.length; n-- && t.indexOf(e.charAt(n)) > -1; )
                        ;
                    return n
                }
                function l(e, t) {
                    return r(e.criteria, t.criteria) || e.index - t.index
                }
                function h(e, t, n) {
                    for (var i = -1, o = e.criteria, a = t.criteria, s = o.length, u = n.length; ++i < s; ) {
                        var c = r(o[i], a[i]);
                        if (c) {
                            if (i >= u)
                                return c;
                            var l = n[i];
                            return c * ("asc" === l || l === !0 ? 1 : -1)
                        }
                    }
                    return e.index - t.index
                }
                function f(e) {
                    return We[e]
                }
                function p(e) {
                    return Xe[e]
                }
                function d(e, t, n) {
                    return t ? e = Ke[e] : n && (e = Ye[e]),
                    "\\" + e
                }
                function v(e) {
                    return "\\" + Ye[e]
                }
                function _(e, t, n) {
                    for (var r = e.length, i = t + (n ? 0 : -1); n ? i-- : ++i < r; ) {
                        var o = e[i];
                        if (o !== o)
                            return i
                    }
                    return -1
                }
                function m(e) {
                    return !!e && "object" == typeof e
                }
                function g(e) {
                    return e <= 160 && e >= 9 && e <= 13 || 32 == e || 160 == e || 5760 == e || 6158 == e || e >= 8192 && (e <= 8202 || 8232 == e || 8233 == e || 8239 == e || 8287 == e || 12288 == e || 65279 == e)
                }
                function T(e, t) {
                    for (var n = -1, r = e.length, i = -1, o = []; ++n < r; )
                        e[n] === t && (e[n] = W,
                        o[++i] = n);
                    return o
                }
                function y(e, t) {
                    for (var n, r = -1, i = e.length, o = -1, a = []; ++r < i; ) {
                        var s = e[r]
                          , u = t ? t(s, r, e) : s;
                        r && n === u || (n = u,
                        a[++o] = s)
                    }
                    return a
                }
                function b(e) {
                    for (var t = -1, n = e.length; ++t < n && g(e.charCodeAt(t)); )
                        ;
                    return t
                }
                function S(e) {
                    for (var t = e.length; t-- && g(e.charCodeAt(t)); )
                        ;
                    return t
                }
                function P(e) {
                    return ze[e]
                }
                function E(e) {
                    function t(e) {
                        if (m(e) && !Cs(e) && !(e instanceof $)) {
                            if (e instanceof g)
                                return e;
                            if (ta.call(e, "__chain__") && ta.call(e, "__wrapped__"))
                                return pr(e)
                        }
                        return new g(e)
                    }
                    function n() {}
                    function g(e, t, n) {
                        this.__wrapped__ = e,
                        this.__actions__ = n || [],
                        this.__chain__ = !!t
                    }
                    function $(e) {
                        this.__wrapped__ = e,
                        this.__actions__ = [],
                        this.__dir__ = 1,
                        this.__filtered__ = !1,
                        this.__iteratees__ = [],
                        this.__takeCount__ = xa,
                        this.__views__ = []
                    }
                    function te() {
                        var e = new $(this.__wrapped__);
                        return e.__actions__ = et(this.__actions__),
                        e.__dir__ = this.__dir__,
                        e.__filtered__ = this.__filtered__,
                        e.__iteratees__ = et(this.__iteratees__),
                        e.__takeCount__ = this.__takeCount__,
                        e.__views__ = et(this.__views__),
                        e
                    }
                    function re() {
                        if (this.__filtered__) {
                            var e = new $(this);
                            e.__dir__ = -1,
                            e.__filtered__ = !0
                        } else
                            e = this.clone(),
                            e.__dir__ *= -1;
                        return e
                    }
                    function We() {
                        var e = this.__wrapped__.value()
                          , t = this.__dir__
                          , n = Cs(e)
                          , r = t < 0
                          , i = n ? e.length : 0
                          , o = zn(0, i, this.__views__)
                          , a = o.start
                          , s = o.end
                          , u = s - a
                          , c = r ? s : a - 1
                          , l = this.__iteratees__
                          , h = l.length
                          , f = 0
                          , p = Pa(u, this.__takeCount__);
                        if (!n || i < F || i == u && p == u)
                            return nn(r && n ? e.reverse() : e, this.__actions__);
                        var d = [];
                        e: for (; u-- && f < p; ) {
                            c += t;
                            for (var v = -1, _ = e[c]; ++v < h; ) {
                                var m = l[v]
                                  , g = m.iteratee
                                  , T = m.type
                                  , y = g(_);
                                if (T == V)
                                    _ = y;
                                else if (!y) {
                                    if (T == k)
                                        continue e;
                                    break e
                                }
                            }
                            d[f++] = _
                        }
                        return d
                    }
                    function Xe() {
                        this.__data__ = {}
                    }
                    function ze(e) {
                        return this.has(e) && delete this.__data__[e]
                    }
                    function qe(e) {
                        return "__proto__" == e ? A : this.__data__[e]
                    }
                    function Ke(e) {
                        return "__proto__" != e && ta.call(this.__data__, e)
                    }
                    function Ye(e, t) {
                        return "__proto__" != e && (this.__data__[e] = t),
                        this
                    }
                    function Qe(e) {
                        var t = e ? e.length : 0;
                        for (this.data = {
                            hash: ma(null),
                            set: new ha
                        }; t--; )
                            this.push(e[t])
                    }
                    function $e(e, t) {
                        var n = e.data
                          , r = "string" == typeof t || Gi(t) ? n.set.has(t) : n.hash[t];
                        return r ? 0 : -1
                    }
                    function Je(e) {
                        var t = this.data;
                        "string" == typeof e || Gi(e) ? t.set.add(e) : t.hash[e] = !0
                    }
                    function Ze(e, t) {
                        for (var n = -1, r = e.length, i = -1, o = t.length, a = ko(r + o); ++n < r; )
                            a[n] = e[n];
                        for (; ++i < o; )
                            a[n++] = t[i];
                        return a
                    }
                    function et(e, t) {
                        var n = -1
                          , r = e.length;
                        for (t || (t = ko(r)); ++n < r; )
                            t[n] = e[n];
                        return t
                    }
                    function tt(e, t) {
                        for (var n = -1, r = e.length; ++n < r && t(e[n], n, e) !== !1; )
                            ;
                        return e
                    }
                    function it(e, t) {
                        for (var n = e.length; n-- && t(e[n], n, e) !== !1; )
                            ;
                        return e
                    }
                    function ot(e, t) {
                        for (var n = -1, r = e.length; ++n < r; )
                            if (!t(e[n], n, e))
                                return !1;
                        return !0
                    }
                    function at(e, t, n, r) {
                        for (var i = -1, o = e.length, a = r, s = a; ++i < o; ) {
                            var u = e[i]
                              , c = +t(u);
                            n(c, a) && (a = c,
                            s = u)
                        }
                        return s
                    }
                    function st(e, t) {
                        for (var n = -1, r = e.length, i = -1, o = []; ++n < r; ) {
                            var a = e[n];
                            t(a, n, e) && (o[++i] = a)
                        }
                        return o
                    }
                    function ut(e, t) {
                        for (var n = -1, r = e.length, i = ko(r); ++n < r; )
                            i[n] = t(e[n], n, e);
                        return i
                    }
                    function ct(e, t) {
                        for (var n = -1, r = t.length, i = e.length; ++n < r; )
                            e[i + n] = t[n];
                        return e
                    }
                    function lt(e, t, n, r) {
                        var i = -1
                          , o = e.length;
                        for (r && o && (n = e[++i]); ++i < o; )
                            n = t(n, e[i], i, e);
                        return n
                    }
                    function ht(e, t, n, r) {
                        var i = e.length;
                        for (r && i && (n = e[--i]); i--; )
                            n = t(n, e[i], i, e);
                        return n
                    }
                    function ft(e, t) {
                        for (var n = -1, r = e.length; ++n < r; )
                            if (t(e[n], n, e))
                                return !0;
                        return !1
                    }
                    function pt(e, t) {
                        for (var n = e.length, r = 0; n--; )
                            r += +t(e[n]) || 0;
                        return r
                    }
                    function dt(e, t) {
                        return e === A ? t : e
                    }
                    function vt(e, t, n, r) {
                        return e !== A && ta.call(r, n) ? e : t
                    }
                    function _t(e, t, n) {
                        for (var r = -1, i = Fs(t), o = i.length; ++r < o; ) {
                            var a = i[r]
                              , s = e[a]
                              , u = n(s, t[a], a, e, t);
                            (u === u ? u === s : s !== s) && (s !== A || a in e) || (e[a] = u)
                        }
                        return e
                    }
                    function mt(e, t) {
                        return null == t ? e : Tt(t, Fs(t), e)
                    }
                    function gt(e, t) {
                        for (var n = -1, r = null == e, i = !r && $n(e), o = i ? e.length : 0, a = t.length, s = ko(a); ++n < a; ) {
                            var u = t[n];
                            i ? s[n] = Jn(u, o) ? e[u] : A : s[n] = r ? A : e[u]
                        }
                        return s
                    }
                    function Tt(e, t, n) {
                        n || (n = {});
                        for (var r = -1, i = t.length; ++r < i; ) {
                            var o = t[r];
                            n[o] = e[o]
                        }
                        return n
                    }
                    function yt(e, t, n) {
                        var r = typeof e;
                        return "function" == r ? t === A ? e : an(e, t, n) : null == e ? xo : "object" == r ? Nt(e) : t === A ? Go(e) : Ft(e, t)
                    }
                    function bt(e, t, n, r, i, o, a) {
                        var s;
                        if (n && (s = i ? n(e, r, i) : n(e)),
                        s !== A)
                            return s;
                        if (!Gi(e))
                            return e;
                        var u = Cs(e);
                        if (u) {
                            if (s = qn(e),
                            !t)
                                return et(e, s)
                        } else {
                            var c = ra.call(e)
                              , l = c == Q;
                            if (c != Z && c != X && (!l || i))
                                return Ue[c] ? Yn(e, c, t) : i ? e : {};
                            if (s = Kn(l ? {} : e),
                            !t)
                                return mt(s, e)
                        }
                        o || (o = []),
                        a || (a = []);
                        for (var h = o.length; h--; )
                            if (o[h] == e)
                                return a[h];
                        return o.push(e),
                        a.push(s),
                        (u ? tt : Ht)(e, function(r, i) {
                            s[i] = bt(r, t, n, i, e, o, a)
                        }),
                        s
                    }
                    function St(e, t, n) {
                        if ("function" != typeof e)
                            throw new Qo(U);
                        return fa(function() {
                            e.apply(A, n)
                        }, t)
                    }
                    function Pt(e, t) {
                        var n = e ? e.length : 0
                          , r = [];
                        if (!n)
                            return r;
                        var i = -1
                          , a = Un()
                          , s = a == o
                          , u = s && t.length >= F ? vn(t) : null
                          , c = t.length;
                        u && (a = $e,
                        s = !1,
                        t = u);
                        e: for (; ++i < n; ) {
                            var l = e[i];
                            if (s && l === l) {
                                for (var h = c; h--; )
                                    if (t[h] === l)
                                        continue e;
                                r.push(l)
                            } else
                                a(t, l, 0) < 0 && r.push(l)
                        }
                        return r
                    }
                    function Et(e, t) {
                        var n = !0;
                        return Ia(e, function(e, r, i) {
                            return n = !!t(e, r, i)
                        }),
                        n
                    }
                    function At(e, t, n, r) {
                        var i = r
                          , o = i;
                        return Ia(e, function(e, a, s) {
                            var u = +t(e, a, s);
                            (n(u, i) || u === r && u === o) && (i = u,
                            o = e)
                        }),
                        o
                    }
                    function wt(e, t, n, r) {
                        var i = e.length;
                        for (n = null == n ? 0 : +n || 0,
                        n < 0 && (n = -n > i ? 0 : i + n),
                        r = r === A || r > i ? i : +r || 0,
                        r < 0 && (r += i),
                        i = n > r ? 0 : r >>> 0,
                        n >>>= 0; n < i; )
                            e[n++] = t;
                        return e
                    }
                    function Mt(e, t) {
                        var n = [];
                        return Ia(e, function(e, r, i) {
                            t(e, r, i) && n.push(e)
                        }),
                        n
                    }
                    function xt(e, t, n, r) {
                        var i;
                        return n(e, function(e, n, o) {
                            if (t(e, n, o))
                                return i = r ? n : e,
                                !1
                        }),
                        i
                    }
                    function Ct(e, t, n, r) {
                        r || (r = []);
                        for (var i = -1, o = e.length; ++i < o; ) {
                            var a = e[i];
                            m(a) && $n(a) && (n || Cs(a) || Ai(a)) ? t ? Ct(a, t, n, r) : ct(r, a) : n || (r[r.length] = a)
                        }
                        return r
                    }
                    function Rt(e, t) {
                        return Da(e, t, eo)
                    }
                    function Ht(e, t) {
                        return Da(e, t, Fs)
                    }
                    function jt(e, t) {
                        return Na(e, t, Fs)
                    }
                    function Lt(e, t) {
                        for (var n = -1, r = t.length, i = -1, o = []; ++n < r; ) {
                            var a = t[n];
                            Li(e[a]) && (o[++i] = a)
                        }
                        return o
                    }
                    function Gt(e, t, n) {
                        if (null != e) {
                            n !== A && n in hr(e) && (t = [n]);
                            for (var r = 0, i = t.length; null != e && r < i; )
                                e = e[t[r++]];
                            return r && r == i ? e : A
                        }
                    }
                    function Ot(e, t, n, r, i, o) {
                        return e === t || (null == e || null == t || !Gi(e) && !m(t) ? e !== e && t !== t : It(e, t, Ot, n, r, i, o))
                    }
                    function It(e, t, n, r, i, o, a) {
                        var s = Cs(e)
                          , u = Cs(t)
                          , c = z
                          , l = z;
                        s || (c = ra.call(e),
                        c == X ? c = Z : c != Z && (s = Ui(e))),
                        u || (l = ra.call(t),
                        l == X ? l = Z : l != Z && (u = Ui(t)));
                        var h = c == Z
                          , f = l == Z
                          , p = c == l;
                        if (p && !s && !h)
                            return Nn(e, t, c);
                        if (!i) {
                            var d = h && ta.call(e, "__wrapped__")
                              , v = f && ta.call(t, "__wrapped__");
                            if (d || v)
                                return n(d ? e.value() : e, v ? t.value() : t, r, i, o, a)
                        }
                        if (!p)
                            return !1;
                        o || (o = []),
                        a || (a = []);
                        for (var _ = o.length; _--; )
                            if (o[_] == e)
                                return a[_] == t;
                        o.push(e),
                        a.push(t);
                        var m = (s ? Dn : Fn)(e, t, n, r, i, o, a);
                        return o.pop(),
                        a.pop(),
                        m
                    }
                    function Bt(e, t, n) {
                        var r = t.length
                          , i = r
                          , o = !n;
                        if (null == e)
                            return !i;
                        for (e = hr(e); r--; ) {
                            var a = t[r];
                            if (o && a[2] ? a[1] !== e[a[0]] : !(a[0]in e))
                                return !1
                        }
                        for (; ++r < i; ) {
                            a = t[r];
                            var s = a[0]
                              , u = e[s]
                              , c = a[1];
                            if (o && a[2]) {
                                if (u === A && !(s in e))
                                    return !1
                            } else {
                                var l = n ? n(u, c, s) : A;
                                if (!(l === A ? Ot(c, u, n, !0) : l))
                                    return !1
                            }
                        }
                        return !0
                    }
                    function Dt(e, t) {
                        var n = -1
                          , r = $n(e) ? ko(e.length) : [];
                        return Ia(e, function(e, i, o) {
                            r[++n] = t(e, i, o)
                        }),
                        r
                    }
                    function Nt(e) {
                        var t = Wn(e);
                        if (1 == t.length && t[0][2]) {
                            var n = t[0][0]
                              , r = t[0][1];
                            return function(e) {
                                return null != e && (e[n] === r && (r !== A || n in hr(e)))
                            }
                        }
                        return function(e) {
                            return Bt(e, t)
                        }
                    }
                    function Ft(e, t) {
                        var n = Cs(e)
                          , r = er(e) && rr(t)
                          , i = e + "";
                        return e = fr(e),
                        function(o) {
                            if (null == o)
                                return !1;
                            var a = i;
                            if (o = hr(o),
                            (n || !r) && !(a in o)) {
                                if (o = 1 == e.length ? o : Gt(o, Kt(e, 0, -1)),
                                null == o)
                                    return !1;
                                a = wr(e),
                                o = hr(o)
                            }
                            return o[a] === t ? t !== A || a in o : Ot(t, o[a], A, !0)
                        }
                    }
                    function kt(e, t, n, r, i) {
                        if (!Gi(e))
                            return e;
                        var o = $n(t) && (Cs(t) || Ui(t))
                          , a = o ? A : Fs(t);
                        return tt(a || t, function(s, u) {
                            if (a && (u = s,
                            s = t[u]),
                            m(s))
                                r || (r = []),
                                i || (i = []),
                                Vt(e, t, u, kt, n, r, i);
                            else {
                                var c = e[u]
                                  , l = n ? n(c, s, u, e, t) : A
                                  , h = l === A;
                                h && (l = s),
                                l === A && (!o || u in e) || !h && (l === l ? l === c : c !== c) || (e[u] = l)
                            }
                        }),
                        e
                    }
                    function Vt(e, t, n, r, i, o, a) {
                        for (var s = o.length, u = t[n]; s--; )
                            if (o[s] == u)
                                return void (e[n] = a[s]);
                        var c = e[n]
                          , l = i ? i(c, u, n, e, t) : A
                          , h = l === A;
                        h && (l = u,
                        $n(u) && (Cs(u) || Ui(u)) ? l = Cs(c) ? c : $n(c) ? et(c) : [] : Fi(u) || Ai(u) ? l = Ai(c) ? Ki(c) : Fi(c) ? c : {} : h = !1),
                        o.push(u),
                        a.push(l),
                        h ? e[n] = r(l, u, i, o, a) : (l === l ? l !== c : c === c) && (e[n] = l)
                    }
                    function Ut(e) {
                        return function(t) {
                            return null == t ? A : t[e]
                        }
                    }
                    function Wt(e) {
                        var t = e + "";
                        return e = fr(e),
                        function(n) {
                            return Gt(n, e, t)
                        }
                    }
                    function Xt(e, t) {
                        for (var n = e ? t.length : 0; n--; ) {
                            var r = t[n];
                            if (r != i && Jn(r)) {
                                var i = r;
                                pa.call(e, r, 1)
                            }
                        }
                        return e
                    }
                    function zt(e, t) {
                        return e + ga(wa() * (t - e + 1))
                    }
                    function qt(e, t, n, r, i) {
                        return i(e, function(e, i, o) {
                            n = r ? (r = !1,
                            e) : t(n, e, i, o)
                        }),
                        n
                    }
                    function Kt(e, t, n) {
                        var r = -1
                          , i = e.length;
                        t = null == t ? 0 : +t || 0,
                        t < 0 && (t = -t > i ? 0 : i + t),
                        n = n === A || n > i ? i : +n || 0,
                        n < 0 && (n += i),
                        i = t > n ? 0 : n - t >>> 0,
                        t >>>= 0;
                        for (var o = ko(i); ++r < i; )
                            o[r] = e[r + t];
                        return o
                    }
                    function Yt(e, t) {
                        var n;
                        return Ia(e, function(e, r, i) {
                            return n = t(e, r, i),
                            !n
                        }),
                        !!n
                    }
                    function Qt(e, t) {
                        var n = e.length;
                        for (e.sort(t); n--; )
                            e[n] = e[n].value;
                        return e
                    }
                    function $t(e, t, n) {
                        var r = kn()
                          , i = -1;
                        t = ut(t, function(e) {
                            return r(e)
                        });
                        var o = Dt(e, function(e) {
                            var n = ut(t, function(t) {
                                return t(e)
                            });
                            return {
                                criteria: n,
                                index: ++i,
                                value: e
                            }
                        });
                        return Qt(o, function(e, t) {
                            return h(e, t, n)
                        })
                    }
                    function Jt(e, t) {
                        var n = 0;
                        return Ia(e, function(e, r, i) {
                            n += +t(e, r, i) || 0
                        }),
                        n
                    }
                    function Zt(e, t) {
                        var n = -1
                          , r = Un()
                          , i = e.length
                          , a = r == o
                          , s = a && i >= F
                          , u = s ? vn() : null
                          , c = [];
                        u ? (r = $e,
                        a = !1) : (s = !1,
                        u = t ? [] : c);
                        e: for (; ++n < i; ) {
                            var l = e[n]
                              , h = t ? t(l, n, e) : l;
                            if (a && l === l) {
                                for (var f = u.length; f--; )
                                    if (u[f] === h)
                                        continue e;
                                t && u.push(h),
                                c.push(l)
                            } else
                                r(u, h, 0) < 0 && ((t || s) && u.push(h),
                                c.push(l))
                        }
                        return c
                    }
                    function en(e, t) {
                        for (var n = -1, r = t.length, i = ko(r); ++n < r; )
                            i[n] = e[t[n]];
                        return i
                    }
                    function tn(e, t, n, r) {
                        for (var i = e.length, o = r ? i : -1; (r ? o-- : ++o < i) && t(e[o], o, e); )
                            ;
                        return n ? Kt(e, r ? 0 : o, r ? o + 1 : i) : Kt(e, r ? o + 1 : 0, r ? i : o)
                    }
                    function nn(e, t) {
                        var n = e;
                        n instanceof $ && (n = n.value());
                        for (var r = -1, i = t.length; ++r < i; ) {
                            var o = t[r];
                            n = o.func.apply(o.thisArg, ct([n], o.args))
                        }
                        return n
                    }
                    function rn(e, t, n) {
                        var r = 0
                          , i = e ? e.length : r;
                        if ("number" == typeof t && t === t && i <= Ha) {
                            for (; r < i; ) {
                                var o = r + i >>> 1
                                  , a = e[o];
                                (n ? a <= t : a < t) && null !== a ? r = o + 1 : i = o
                            }
                            return i
                        }
                        return on(e, t, xo, n)
                    }
                    function on(e, t, n, r) {
                        t = n(t);
                        for (var i = 0, o = e ? e.length : 0, a = t !== t, s = null === t, u = t === A; i < o; ) {
                            var c = ga((i + o) / 2)
                              , l = n(e[c])
                              , h = l !== A
                              , f = l === l;
                            if (a)
                                var p = f || r;
                            else
                                p = s ? f && h && (r || null != l) : u ? f && (r || h) : null != l && (r ? l <= t : l < t);
                            p ? i = c + 1 : o = c
                        }
                        return Pa(o, Ra)
                    }
                    function an(e, t, n) {
                        if ("function" != typeof e)
                            return xo;
                        if (t === A)
                            return e;
                        switch (n) {
                        case 1:
                            return function(n) {
                                return e.call(t, n)
                            }
                            ;
                        case 3:
                            return function(n, r, i) {
                                return e.call(t, n, r, i)
                            }
                            ;
                        case 4:
                            return function(n, r, i, o) {
                                return e.call(t, n, r, i, o)
                            }
                            ;
                        case 5:
                            return function(n, r, i, o, a) {
                                return e.call(t, n, r, i, o, a)
                            }
                        }
                        return function() {
                            return e.apply(t, arguments)
                        }
                    }
                    function sn(e) {
                        var t = new aa(e.byteLength)
                          , n = new da(t);
                        return n.set(new da(e)),
                        t
                    }
                    function un(e, t, n) {
                        for (var r = n.length, i = -1, o = Sa(e.length - r, 0), a = -1, s = t.length, u = ko(s + o); ++a < s; )
                            u[a] = t[a];
                        for (; ++i < r; )
                            u[n[i]] = e[i];
                        for (; o--; )
                            u[a++] = e[i++];
                        return u
                    }
                    function cn(e, t, n) {
                        for (var r = -1, i = n.length, o = -1, a = Sa(e.length - i, 0), s = -1, u = t.length, c = ko(a + u); ++o < a; )
                            c[o] = e[o];
                        for (var l = o; ++s < u; )
                            c[l + s] = t[s];
                        for (; ++r < i; )
                            c[l + n[r]] = e[o++];
                        return c
                    }
                    function ln(e, t) {
                        return function(n, r, i) {
                            var o = t ? t() : {};
                            if (r = kn(r, i, 3),
                            Cs(n))
                                for (var a = -1, s = n.length; ++a < s; ) {
                                    var u = n[a];
                                    e(o, u, r(u, a, n), n)
                                }
                            else
                                Ia(n, function(t, n, i) {
                                    e(o, t, r(t, n, i), i)
                                });
                            return o
                        }
                    }
                    function hn(e) {
                        return mi(function(t, n) {
                            var r = -1
                              , i = null == t ? 0 : n.length
                              , o = i > 2 ? n[i - 2] : A
                              , a = i > 2 ? n[2] : A
                              , s = i > 1 ? n[i - 1] : A;
                            for ("function" == typeof o ? (o = an(o, s, 5),
                            i -= 2) : (o = "function" == typeof s ? s : A,
                            i -= o ? 1 : 0),
                            a && Zn(n[0], n[1], a) && (o = i < 3 ? A : o,
                            i = 1); ++r < i; ) {
                                var u = n[r];
                                u && e(t, u, o)
                            }
                            return t
                        })
                    }
                    function fn(e, t) {
                        return function(n, r) {
                            var i = n ? Va(n) : 0;
                            if (!nr(i))
                                return e(n, r);
                            for (var o = t ? i : -1, a = hr(n); (t ? o-- : ++o < i) && r(a[o], o, a) !== !1; )
                                ;
                            return n
                        }
                    }
                    function pn(e) {
                        return function(t, n, r) {
                            for (var i = hr(t), o = r(t), a = o.length, s = e ? a : -1; e ? s-- : ++s < a; ) {
                                var u = o[s];
                                if (n(i[u], u, i) === !1)
                                    break
                            }
                            return t
                        }
                    }
                    function dn(e, t) {
                        function n() {
                            var i = this && this !== nt && this instanceof n ? r : e;
                            return i.apply(t, arguments)
                        }
                        var r = mn(e);
                        return n
                    }
                    function vn(e) {
                        return ma && ha ? new Qe(e) : null
                    }
                    function _n(e) {
                        return function(t) {
                            for (var n = -1, r = Ao(lo(t)), i = r.length, o = ""; ++n < i; )
                                o = e(o, r[n], n);
                            return o
                        }
                    }
                    function mn(e) {
                        return function() {
                            var t = arguments;
                            switch (t.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t[0]);
                            case 2:
                                return new e(t[0],t[1]);
                            case 3:
                                return new e(t[0],t[1],t[2]);
                            case 4:
                                return new e(t[0],t[1],t[2],t[3]);
                            case 5:
                                return new e(t[0],t[1],t[2],t[3],t[4]);
                            case 6:
                                return new e(t[0],t[1],t[2],t[3],t[4],t[5]);
                            case 7:
                                return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])
                            }
                            var n = Oa(e.prototype)
                              , r = e.apply(n, t);
                            return Gi(r) ? r : n
                        }
                    }
                    function gn(e) {
                        function t(n, r, i) {
                            i && Zn(n, r, i) && (r = A);
                            var o = Bn(n, e, A, A, A, A, A, r);
                            return o.placeholder = t.placeholder,
                            o
                        }
                        return t
                    }
                    function Tn(e, t) {
                        return mi(function(n) {
                            var r = n[0];
                            return null == r ? r : (n.push(t),
                            e.apply(A, n))
                        })
                    }
                    function yn(e, t) {
                        return function(n, r, i) {
                            if (i && Zn(n, r, i) && (r = A),
                            r = kn(r, i, 3),
                            1 == r.length) {
                                n = Cs(n) ? n : lr(n);
                                var o = at(n, r, e, t);
                                if (!n.length || o !== t)
                                    return o
                            }
                            return At(n, r, e, t)
                        }
                    }
                    function bn(e, t) {
                        return function(n, r, o) {
                            if (r = kn(r, o, 3),
                            Cs(n)) {
                                var a = i(n, r, t);
                                return a > -1 ? n[a] : A
                            }
                            return xt(n, r, e)
                        }
                    }
                    function Sn(e) {
                        return function(t, n, r) {
                            return t && t.length ? (n = kn(n, r, 3),
                            i(t, n, e)) : -1
                        }
                    }
                    function Pn(e) {
                        return function(t, n, r) {
                            return n = kn(n, r, 3),
                            xt(t, n, e, !0)
                        }
                    }
                    function En(e) {
                        return function() {
                            for (var t, n = arguments.length, r = e ? n : -1, i = 0, o = ko(n); e ? r-- : ++r < n; ) {
                                var a = o[i++] = arguments[r];
                                if ("function" != typeof a)
                                    throw new Qo(U);
                                !t && g.prototype.thru && "wrapper" == Vn(a) && (t = new g([],(!0)))
                            }
                            for (r = t ? -1 : n; ++r < n; ) {
                                a = o[r];
                                var s = Vn(a)
                                  , u = "wrapper" == s ? ka(a) : A;
                                t = u && tr(u[0]) && u[1] == (G | R | j | O) && !u[4].length && 1 == u[9] ? t[Vn(u[0])].apply(t, u[3]) : 1 == a.length && tr(a) ? t[s]() : t.thru(a)
                            }
                            return function() {
                                var e = arguments
                                  , r = e[0];
                                if (t && 1 == e.length && Cs(r) && r.length >= F)
                                    return t.plant(r).value();
                                for (var i = 0, a = n ? o[i].apply(this, e) : r; ++i < n; )
                                    a = o[i].call(this, a);
                                return a
                            }
                        }
                    }
                    function An(e, t) {
                        return function(n, r, i) {
                            return "function" == typeof r && i === A && Cs(n) ? e(n, r) : t(n, an(r, i, 3))
                        }
                    }
                    function wn(e) {
                        return function(t, n, r) {
                            return "function" == typeof n && r === A || (n = an(n, r, 3)),
                            e(t, n, eo)
                        }
                    }
                    function Mn(e) {
                        return function(t, n, r) {
                            return "function" == typeof n && r === A || (n = an(n, r, 3)),
                            e(t, n)
                        }
                    }
                    function xn(e) {
                        return function(t, n, r) {
                            var i = {};
                            return n = kn(n, r, 3),
                            Ht(t, function(t, r, o) {
                                var a = n(t, r, o);
                                r = e ? a : r,
                                t = e ? t : a,
                                i[r] = t
                            }),
                            i
                        }
                    }
                    function Cn(e) {
                        return function(t, n, r) {
                            return t = s(t),
                            (e ? t : "") + Ln(t, n, r) + (e ? "" : t)
                        }
                    }
                    function Rn(e) {
                        var t = mi(function(n, r) {
                            var i = T(r, t.placeholder);
                            return Bn(n, e, A, r, i)
                        });
                        return t
                    }
                    function Hn(e, t) {
                        return function(n, r, i, o) {
                            var a = arguments.length < 3;
                            return "function" == typeof r && o === A && Cs(n) ? e(n, r, i, a) : qt(n, kn(r, o, 4), i, a, t)
                        }
                    }
                    function jn(e, t, n, r, i, o, a, s, u, c) {
                        function l() {
                            for (var g = arguments.length, y = g, b = ko(g); y--; )
                                b[y] = arguments[y];
                            if (r && (b = un(b, r, i)),
                            o && (b = cn(b, o, a)),
                            d || _) {
                                var S = l.placeholder
                                  , P = T(b, S);
                                if (g -= P.length,
                                g < c) {
                                    var E = s ? et(s) : A
                                      , w = Sa(c - g, 0)
                                      , C = d ? P : A
                                      , R = d ? A : P
                                      , H = d ? b : A
                                      , G = d ? A : b;
                                    t |= d ? j : L,
                                    t &= ~(d ? L : j),
                                    v || (t &= ~(M | x));
                                    var O = [e, t, n, H, C, G, R, E, u, w]
                                      , I = jn.apply(A, O);
                                    return tr(e) && Ua(I, O),
                                    I.placeholder = S,
                                    I
                                }
                            }
                            var B = f ? n : this
                              , D = p ? B[e] : e;
                            return s && (b = ur(b, s)),
                            h && u < b.length && (b.length = u),
                            this && this !== nt && this instanceof l && (D = m || mn(e)),
                            D.apply(B, b)
                        }
                        var h = t & G
                          , f = t & M
                          , p = t & x
                          , d = t & R
                          , v = t & C
                          , _ = t & H
                          , m = p ? A : mn(e);
                        return l
                    }
                    function Ln(e, t, n) {
                        var r = e.length;
                        if (t = +t,
                        r >= t || !ya(t))
                            return "";
                        var i = t - r;
                        return n = null == n ? " " : n + "",
                        mo(n, _a(i / n.length)).slice(0, i)
                    }
                    function Gn(e, t, n, r) {
                        function i() {
                            for (var t = -1, s = arguments.length, u = -1, c = r.length, l = ko(c + s); ++u < c; )
                                l[u] = r[u];
                            for (; s--; )
                                l[u++] = arguments[++t];
                            var h = this && this !== nt && this instanceof i ? a : e;
                            return h.apply(o ? n : this, l)
                        }
                        var o = t & M
                          , a = mn(e);
                        return i
                    }
                    function On(e) {
                        var t = Xo[e];
                        return function(e, n) {
                            return n = n === A ? 0 : +n || 0,
                            n ? (n = ca(10, n),
                            t(e * n) / n) : t(e)
                        }
                    }
                    function In(e) {
                        return function(t, n, r, i) {
                            var o = kn(r);
                            return null == r && o === yt ? rn(t, n, e) : on(t, n, o(r, i, 1), e)
                        }
                    }
                    function Bn(e, t, n, r, i, o, a, s) {
                        var u = t & x;
                        if (!u && "function" != typeof e)
                            throw new Qo(U);
                        var c = r ? r.length : 0;
                        if (c || (t &= ~(j | L),
                        r = i = A),
                        c -= i ? i.length : 0,
                        t & L) {
                            var l = r
                              , h = i;
                            r = i = A
                        }
                        var f = u ? A : ka(e)
                          , p = [e, t, n, r, i, l, h, o, a, s];
                        if (f && (ir(p, f),
                        t = p[1],
                        s = p[9]),
                        p[9] = null == s ? u ? 0 : e.length : Sa(s - c, 0) || 0,
                        t == M)
                            var d = dn(p[0], p[2]);
                        else
                            d = t != j && t != (M | j) || p[4].length ? jn.apply(A, p) : Gn.apply(A, p);
                        var v = f ? Fa : Ua;
                        return v(d, p)
                    }
                    function Dn(e, t, n, r, i, o, a) {
                        var s = -1
                          , u = e.length
                          , c = t.length;
                        if (u != c && !(i && c > u))
                            return !1;
                        for (; ++s < u; ) {
                            var l = e[s]
                              , h = t[s]
                              , f = r ? r(i ? h : l, i ? l : h, s) : A;
                            if (f !== A) {
                                if (f)
                                    continue;
                                return !1
                            }
                            if (i) {
                                if (!ft(t, function(e) {
                                    return l === e || n(l, e, r, i, o, a)
                                }))
                                    return !1
                            } else if (l !== h && !n(l, h, r, i, o, a))
                                return !1
                        }
                        return !0
                    }
                    function Nn(e, t, n) {
                        switch (n) {
                        case q:
                        case K:
                            return +e == +t;
                        case Y:
                            return e.name == t.name && e.message == t.message;
                        case J:
                            return e != +e ? t != +t : e == +t;
                        case ee:
                        case ne:
                            return e == t + ""
                        }
                        return !1;
                    }
                    function Fn(e, t, n, r, i, o, a) {
                        var s = Fs(e)
                          , u = s.length
                          , c = Fs(t)
                          , l = c.length;
                        if (u != l && !i)
                            return !1;
                        for (var h = u; h--; ) {
                            var f = s[h];
                            if (!(i ? f in t : ta.call(t, f)))
                                return !1
                        }
                        for (var p = i; ++h < u; ) {
                            f = s[h];
                            var d = e[f]
                              , v = t[f]
                              , _ = r ? r(i ? v : d, i ? d : v, f) : A;
                            if (!(_ === A ? n(d, v, r, i, o, a) : _))
                                return !1;
                            p || (p = "constructor" == f)
                        }
                        if (!p) {
                            var m = e.constructor
                              , g = t.constructor;
                            if (m != g && "constructor"in e && "constructor"in t && !("function" == typeof m && m instanceof m && "function" == typeof g && g instanceof g))
                                return !1
                        }
                        return !0
                    }
                    function kn(e, n, r) {
                        var i = t.callback || wo;
                        return i = i === wo ? yt : i,
                        r ? i(e, n, r) : i
                    }
                    function Vn(e) {
                        for (var t = e.name, n = Ga[t], r = n ? n.length : 0; r--; ) {
                            var i = n[r]
                              , o = i.func;
                            if (null == o || o == e)
                                return i.name
                        }
                        return t
                    }
                    function Un(e, n, r) {
                        var i = t.indexOf || Er;
                        return i = i === Er ? o : i,
                        e ? i(e, n, r) : i
                    }
                    function Wn(e) {
                        for (var t = to(e), n = t.length; n--; )
                            t[n][2] = rr(t[n][1]);
                        return t
                    }
                    function Xn(e, t) {
                        var n = null == e ? A : e[t];
                        return Bi(n) ? n : A
                    }
                    function zn(e, t, n) {
                        for (var r = -1, i = n.length; ++r < i; ) {
                            var o = n[r]
                              , a = o.size;
                            switch (o.type) {
                            case "drop":
                                e += a;
                                break;
                            case "dropRight":
                                t -= a;
                                break;
                            case "take":
                                t = Pa(t, e + a);
                                break;
                            case "takeRight":
                                e = Sa(e, t - a)
                            }
                        }
                        return {
                            start: e,
                            end: t
                        }
                    }
                    function qn(e) {
                        var t = e.length
                          , n = new e.constructor(t);
                        return t && "string" == typeof e[0] && ta.call(e, "index") && (n.index = e.index,
                        n.input = e.input),
                        n
                    }
                    function Kn(e) {
                        var t = e.constructor;
                        return "function" == typeof t && t instanceof t || (t = qo),
                        new t
                    }
                    function Yn(e, t, n) {
                        var r = e.constructor;
                        switch (t) {
                        case ie:
                            return sn(e);
                        case q:
                        case K:
                            return new r((+e));
                        case oe:
                        case ae:
                        case se:
                        case ue:
                        case ce:
                        case le:
                        case he:
                        case fe:
                        case pe:
                            var i = e.buffer;
                            return new r(n ? sn(i) : i,e.byteOffset,e.length);
                        case J:
                        case ne:
                            return new r(e);
                        case ee:
                            var o = new r(e.source,je.exec(e));
                            o.lastIndex = e.lastIndex
                        }
                        return o
                    }
                    function Qn(e, t, n) {
                        null == e || er(t, e) || (t = fr(t),
                        e = 1 == t.length ? e : Gt(e, Kt(t, 0, -1)),
                        t = wr(t));
                        var r = null == e ? e : e[t];
                        return null == r ? A : r.apply(e, n)
                    }
                    function $n(e) {
                        return null != e && nr(Va(e))
                    }
                    function Jn(e, t) {
                        return e = "number" == typeof e || Oe.test(e) ? +e : -1,
                        t = null == t ? ja : t,
                        e > -1 && e % 1 == 0 && e < t
                    }
                    function Zn(e, t, n) {
                        if (!Gi(n))
                            return !1;
                        var r = typeof t;
                        if ("number" == r ? $n(n) && Jn(t, n.length) : "string" == r && t in n) {
                            var i = n[t];
                            return e === e ? e === i : i !== i
                        }
                        return !1
                    }
                    function er(e, t) {
                        var n = typeof e;
                        if ("string" == n && Ae.test(e) || "number" == n)
                            return !0;
                        if (Cs(e))
                            return !1;
                        var r = !Ee.test(e);
                        return r || null != t && e in hr(t)
                    }
                    function tr(e) {
                        var n = Vn(e);
                        if (!(n in $.prototype))
                            return !1;
                        var r = t[n];
                        if (e === r)
                            return !0;
                        var i = ka(r);
                        return !!i && e === i[0]
                    }
                    function nr(e) {
                        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= ja
                    }
                    function rr(e) {
                        return e === e && !Gi(e)
                    }
                    function ir(e, t) {
                        var n = e[1]
                          , r = t[1]
                          , i = n | r
                          , o = i < G
                          , a = r == G && n == R || r == G && n == O && e[7].length <= t[8] || r == (G | O) && n == R;
                        if (!o && !a)
                            return e;
                        r & M && (e[2] = t[2],
                        i |= n & M ? 0 : C);
                        var s = t[3];
                        if (s) {
                            var u = e[3];
                            e[3] = u ? un(u, s, t[4]) : et(s),
                            e[4] = u ? T(e[3], W) : et(t[4])
                        }
                        return s = t[5],
                        s && (u = e[5],
                        e[5] = u ? cn(u, s, t[6]) : et(s),
                        e[6] = u ? T(e[5], W) : et(t[6])),
                        s = t[7],
                        s && (e[7] = et(s)),
                        r & G && (e[8] = null == e[8] ? t[8] : Pa(e[8], t[8])),
                        null == e[9] && (e[9] = t[9]),
                        e[0] = t[0],
                        e[1] = i,
                        e
                    }
                    function or(e, t) {
                        return e === A ? t : Rs(e, t, or)
                    }
                    function ar(e, t) {
                        e = hr(e);
                        for (var n = -1, r = t.length, i = {}; ++n < r; ) {
                            var o = t[n];
                            o in e && (i[o] = e[o])
                        }
                        return i
                    }
                    function sr(e, t) {
                        var n = {};
                        return Rt(e, function(e, r, i) {
                            t(e, r, i) && (n[r] = e)
                        }),
                        n
                    }
                    function ur(e, t) {
                        for (var n = e.length, r = Pa(t.length, n), i = et(e); r--; ) {
                            var o = t[r];
                            e[r] = Jn(o, n) ? i[o] : A
                        }
                        return e
                    }
                    function cr(e) {
                        for (var t = eo(e), n = t.length, r = n && e.length, i = !!r && nr(r) && (Cs(e) || Ai(e)), o = -1, a = []; ++o < n; ) {
                            var s = t[o];
                            (i && Jn(s, r) || ta.call(e, s)) && a.push(s)
                        }
                        return a
                    }
                    function lr(e) {
                        return null == e ? [] : $n(e) ? Gi(e) ? e : qo(e) : oo(e)
                    }
                    function hr(e) {
                        return Gi(e) ? e : qo(e)
                    }
                    function fr(e) {
                        if (Cs(e))
                            return e;
                        var t = [];
                        return s(e).replace(we, function(e, n, r, i) {
                            t.push(r ? i.replace(Re, "$1") : n || e)
                        }),
                        t
                    }
                    function pr(e) {
                        return e instanceof $ ? e.clone() : new g(e.__wrapped__,e.__chain__,et(e.__actions__))
                    }
                    function dr(e, t, n) {
                        t = (n ? Zn(e, t, n) : null == t) ? 1 : Sa(ga(t) || 1, 1);
                        for (var r = 0, i = e ? e.length : 0, o = -1, a = ko(_a(i / t)); r < i; )
                            a[++o] = Kt(e, r, r += t);
                        return a
                    }
                    function vr(e) {
                        for (var t = -1, n = e ? e.length : 0, r = -1, i = []; ++t < n; ) {
                            var o = e[t];
                            o && (i[++r] = o)
                        }
                        return i
                    }
                    function _r(e, t, n) {
                        var r = e ? e.length : 0;
                        return r ? ((n ? Zn(e, t, n) : null == t) && (t = 1),
                        Kt(e, t < 0 ? 0 : t)) : []
                    }
                    function mr(e, t, n) {
                        var r = e ? e.length : 0;
                        return r ? ((n ? Zn(e, t, n) : null == t) && (t = 1),
                        t = r - (+t || 0),
                        Kt(e, 0, t < 0 ? 0 : t)) : []
                    }
                    function gr(e, t, n) {
                        return e && e.length ? tn(e, kn(t, n, 3), !0, !0) : []
                    }
                    function Tr(e, t, n) {
                        return e && e.length ? tn(e, kn(t, n, 3), !0) : []
                    }
                    function yr(e, t, n, r) {
                        var i = e ? e.length : 0;
                        return i ? (n && "number" != typeof n && Zn(e, t, n) && (n = 0,
                        r = i),
                        wt(e, t, n, r)) : []
                    }
                    function br(e) {
                        return e ? e[0] : A
                    }
                    function Sr(e, t, n) {
                        var r = e ? e.length : 0;
                        return n && Zn(e, t, n) && (t = !1),
                        r ? Ct(e, t) : []
                    }
                    function Pr(e) {
                        var t = e ? e.length : 0;
                        return t ? Ct(e, !0) : []
                    }
                    function Er(e, t, n) {
                        var r = e ? e.length : 0;
                        if (!r)
                            return -1;
                        if ("number" == typeof n)
                            n = n < 0 ? Sa(r + n, 0) : n;
                        else if (n) {
                            var i = rn(e, t);
                            return i < r && (t === t ? t === e[i] : e[i] !== e[i]) ? i : -1
                        }
                        return o(e, t, n || 0)
                    }
                    function Ar(e) {
                        return mr(e, 1)
                    }
                    function wr(e) {
                        var t = e ? e.length : 0;
                        return t ? e[t - 1] : A
                    }
                    function Mr(e, t, n) {
                        var r = e ? e.length : 0;
                        if (!r)
                            return -1;
                        var i = r;
                        if ("number" == typeof n)
                            i = (n < 0 ? Sa(r + n, 0) : Pa(n || 0, r - 1)) + 1;
                        else if (n) {
                            i = rn(e, t, !0) - 1;
                            var o = e[i];
                            return (t === t ? t === o : o !== o) ? i : -1
                        }
                        if (t !== t)
                            return _(e, i, !0);
                        for (; i--; )
                            if (e[i] === t)
                                return i;
                        return -1
                    }
                    function xr() {
                        var e = arguments
                          , t = e[0];
                        if (!t || !t.length)
                            return t;
                        for (var n = 0, r = Un(), i = e.length; ++n < i; )
                            for (var o = 0, a = e[n]; (o = r(t, a, o)) > -1; )
                                pa.call(t, o, 1);
                        return t
                    }
                    function Cr(e, t, n) {
                        var r = [];
                        if (!e || !e.length)
                            return r;
                        var i = -1
                          , o = []
                          , a = e.length;
                        for (t = kn(t, n, 3); ++i < a; ) {
                            var s = e[i];
                            t(s, i, e) && (r.push(s),
                            o.push(i))
                        }
                        return Xt(e, o),
                        r
                    }
                    function Rr(e) {
                        return _r(e, 1)
                    }
                    function Hr(e, t, n) {
                        var r = e ? e.length : 0;
                        return r ? (n && "number" != typeof n && Zn(e, t, n) && (t = 0,
                        n = r),
                        Kt(e, t, n)) : []
                    }
                    function jr(e, t, n) {
                        var r = e ? e.length : 0;
                        return r ? ((n ? Zn(e, t, n) : null == t) && (t = 1),
                        Kt(e, 0, t < 0 ? 0 : t)) : []
                    }
                    function Lr(e, t, n) {
                        var r = e ? e.length : 0;
                        return r ? ((n ? Zn(e, t, n) : null == t) && (t = 1),
                        t = r - (+t || 0),
                        Kt(e, t < 0 ? 0 : t)) : []
                    }
                    function Gr(e, t, n) {
                        return e && e.length ? tn(e, kn(t, n, 3), !1, !0) : []
                    }
                    function Or(e, t, n) {
                        return e && e.length ? tn(e, kn(t, n, 3)) : []
                    }
                    function Ir(e, t, n, r) {
                        var i = e ? e.length : 0;
                        if (!i)
                            return [];
                        null != t && "boolean" != typeof t && (r = n,
                        n = Zn(e, t, r) ? A : t,
                        t = !1);
                        var a = kn();
                        return null == n && a === yt || (n = a(n, r, 3)),
                        t && Un() == o ? y(e, n) : Zt(e, n)
                    }
                    function Br(e) {
                        if (!e || !e.length)
                            return [];
                        var t = -1
                          , n = 0;
                        e = st(e, function(e) {
                            if ($n(e))
                                return n = Sa(e.length, n),
                                !0
                        });
                        for (var r = ko(n); ++t < n; )
                            r[t] = ut(e, Ut(t));
                        return r
                    }
                    function Dr(e, t, n) {
                        var r = e ? e.length : 0;
                        if (!r)
                            return [];
                        var i = Br(e);
                        return null == t ? i : (t = an(t, n, 4),
                        ut(i, function(e) {
                            return lt(e, t, A, !0)
                        }))
                    }
                    function Nr() {
                        for (var e = -1, t = arguments.length; ++e < t; ) {
                            var n = arguments[e];
                            if ($n(n))
                                var r = r ? ct(Pt(r, n), Pt(n, r)) : n
                        }
                        return r ? Zt(r) : []
                    }
                    function Fr(e, t) {
                        var n = -1
                          , r = e ? e.length : 0
                          , i = {};
                        for (!r || t || Cs(e[0]) || (t = []); ++n < r; ) {
                            var o = e[n];
                            t ? i[o] = t[n] : o && (i[o[0]] = o[1])
                        }
                        return i
                    }
                    function kr(e) {
                        var n = t(e);
                        return n.__chain__ = !0,
                        n
                    }
                    function Vr(e, t, n) {
                        return t.call(n, e),
                        e
                    }
                    function Ur(e, t, n) {
                        return t.call(n, e)
                    }
                    function Wr() {
                        return kr(this)
                    }
                    function Xr() {
                        return new g(this.value(),this.__chain__)
                    }
                    function zr(e) {
                        for (var t, r = this; r instanceof n; ) {
                            var i = pr(r);
                            t ? o.__wrapped__ = i : t = i;
                            var o = i;
                            r = r.__wrapped__
                        }
                        return o.__wrapped__ = e,
                        t
                    }
                    function qr() {
                        var e = this.__wrapped__
                          , t = function(e) {
                            return n && n.__dir__ < 0 ? e : e.reverse()
                        };
                        if (e instanceof $) {
                            var n = e;
                            return this.__actions__.length && (n = new $(this)),
                            n = n.reverse(),
                            n.__actions__.push({
                                func: Ur,
                                args: [t],
                                thisArg: A
                            }),
                            new g(n,this.__chain__)
                        }
                        return this.thru(t)
                    }
                    function Kr() {
                        return this.value() + ""
                    }
                    function Yr() {
                        return nn(this.__wrapped__, this.__actions__)
                    }
                    function Qr(e, t, n) {
                        var r = Cs(e) ? ot : Et;
                        return n && Zn(e, t, n) && (t = A),
                        "function" == typeof t && n === A || (t = kn(t, n, 3)),
                        r(e, t)
                    }
                    function $r(e, t, n) {
                        var r = Cs(e) ? st : Mt;
                        return t = kn(t, n, 3),
                        r(e, t)
                    }
                    function Jr(e, t) {
                        return is(e, Nt(t))
                    }
                    function Zr(e, t, n, r) {
                        var i = e ? Va(e) : 0;
                        return nr(i) || (e = oo(e),
                        i = e.length),
                        n = "number" != typeof n || r && Zn(t, n, r) ? 0 : n < 0 ? Sa(i + n, 0) : n || 0,
                        "string" == typeof e || !Cs(e) && Vi(e) ? n <= i && e.indexOf(t, n) > -1 : !!i && Un(e, t, n) > -1
                    }
                    function ei(e, t, n) {
                        var r = Cs(e) ? ut : Dt;
                        return t = kn(t, n, 3),
                        r(e, t)
                    }
                    function ti(e, t) {
                        return ei(e, Go(t))
                    }
                    function ni(e, t, n) {
                        var r = Cs(e) ? st : Mt;
                        return t = kn(t, n, 3),
                        r(e, function(e, n, r) {
                            return !t(e, n, r)
                        })
                    }
                    function ri(e, t, n) {
                        if (n ? Zn(e, t, n) : null == t) {
                            e = lr(e);
                            var r = e.length;
                            return r > 0 ? e[zt(0, r - 1)] : A
                        }
                        var i = -1
                          , o = qi(e)
                          , r = o.length
                          , a = r - 1;
                        for (t = Pa(t < 0 ? 0 : +t || 0, r); ++i < t; ) {
                            var s = zt(i, a)
                              , u = o[s];
                            o[s] = o[i],
                            o[i] = u
                        }
                        return o.length = t,
                        o
                    }
                    function ii(e) {
                        return ri(e, xa)
                    }
                    function oi(e) {
                        var t = e ? Va(e) : 0;
                        return nr(t) ? t : Fs(e).length
                    }
                    function ai(e, t, n) {
                        var r = Cs(e) ? ft : Yt;
                        return n && Zn(e, t, n) && (t = A),
                        "function" == typeof t && n === A || (t = kn(t, n, 3)),
                        r(e, t)
                    }
                    function si(e, t, n) {
                        if (null == e)
                            return [];
                        n && Zn(e, t, n) && (t = A);
                        var r = -1;
                        t = kn(t, n, 3);
                        var i = Dt(e, function(e, n, i) {
                            return {
                                criteria: t(e, n, i),
                                index: ++r,
                                value: e
                            }
                        });
                        return Qt(i, l)
                    }
                    function ui(e, t, n, r) {
                        return null == e ? [] : (r && Zn(t, n, r) && (n = A),
                        Cs(t) || (t = null == t ? [] : [t]),
                        Cs(n) || (n = null == n ? [] : [n]),
                        $t(e, t, n))
                    }
                    function ci(e, t) {
                        return $r(e, Nt(t))
                    }
                    function li(e, t) {
                        if ("function" != typeof t) {
                            if ("function" != typeof e)
                                throw new Qo(U);
                            var n = e;
                            e = t,
                            t = n
                        }
                        return e = ya(e = +e) ? e : 0,
                        function() {
                            if (--e < 1)
                                return t.apply(this, arguments)
                        }
                    }
                    function hi(e, t, n) {
                        return n && Zn(e, t, n) && (t = A),
                        t = e && null == t ? e.length : Sa(+t || 0, 0),
                        Bn(e, G, A, A, A, A, t)
                    }
                    function fi(e, t) {
                        var n;
                        if ("function" != typeof t) {
                            if ("function" != typeof e)
                                throw new Qo(U);
                            var r = e;
                            e = t,
                            t = r
                        }
                        return function() {
                            return --e > 0 && (n = t.apply(this, arguments)),
                            e <= 1 && (t = A),
                            n
                        }
                    }
                    function pi(e, t, n) {
                        function r() {
                            p && sa(p),
                            c && sa(c),
                            v = 0,
                            c = p = d = A
                        }
                        function i(t, n) {
                            n && sa(n),
                            c = p = d = A,
                            t && (v = vs(),
                            l = e.apply(f, u),
                            p || c || (u = f = A))
                        }
                        function o() {
                            var e = t - (vs() - h);
                            e <= 0 || e > t ? i(d, c) : p = fa(o, e)
                        }
                        function a() {
                            i(m, p)
                        }
                        function s() {
                            if (u = arguments,
                            h = vs(),
                            f = this,
                            d = m && (p || !g),
                            _ === !1)
                                var n = g && !p;
                            else {
                                c || g || (v = h);
                                var r = _ - (h - v)
                                  , i = r <= 0 || r > _;
                                i ? (c && (c = sa(c)),
                                v = h,
                                l = e.apply(f, u)) : c || (c = fa(a, r))
                            }
                            return i && p ? p = sa(p) : p || t === _ || (p = fa(o, t)),
                            n && (i = !0,
                            l = e.apply(f, u)),
                            !i || p || c || (u = f = A),
                            l
                        }
                        var u, c, l, h, f, p, d, v = 0, _ = !1, m = !0;
                        if ("function" != typeof e)
                            throw new Qo(U);
                        if (t = t < 0 ? 0 : +t || 0,
                        n === !0) {
                            var g = !0;
                            m = !1
                        } else
                            Gi(n) && (g = !!n.leading,
                            _ = "maxWait"in n && Sa(+n.maxWait || 0, t),
                            m = "trailing"in n ? !!n.trailing : m);
                        return s.cancel = r,
                        s
                    }
                    function di(e, t) {
                        if ("function" != typeof e || t && "function" != typeof t)
                            throw new Qo(U);
                        var n = function() {
                            var r = arguments
                              , i = t ? t.apply(this, r) : r[0]
                              , o = n.cache;
                            if (o.has(i))
                                return o.get(i);
                            var a = e.apply(this, r);
                            return n.cache = o.set(i, a),
                            a
                        };
                        return n.cache = new di.Cache,
                        n
                    }
                    function vi(e) {
                        if ("function" != typeof e)
                            throw new Qo(U);
                        return function() {
                            return !e.apply(this, arguments)
                        }
                    }
                    function _i(e) {
                        return fi(2, e)
                    }
                    function mi(e, t) {
                        if ("function" != typeof e)
                            throw new Qo(U);
                        return t = Sa(t === A ? e.length - 1 : +t || 0, 0),
                        function() {
                            for (var n = arguments, r = -1, i = Sa(n.length - t, 0), o = ko(i); ++r < i; )
                                o[r] = n[t + r];
                            switch (t) {
                            case 0:
                                return e.call(this, o);
                            case 1:
                                return e.call(this, n[0], o);
                            case 2:
                                return e.call(this, n[0], n[1], o)
                            }
                            var a = ko(t + 1);
                            for (r = -1; ++r < t; )
                                a[r] = n[r];
                            return a[t] = o,
                            e.apply(this, a)
                        }
                    }
                    function gi(e) {
                        if ("function" != typeof e)
                            throw new Qo(U);
                        return function(t) {
                            return e.apply(this, t)
                        }
                    }
                    function Ti(e, t, n) {
                        var r = !0
                          , i = !0;
                        if ("function" != typeof e)
                            throw new Qo(U);
                        return n === !1 ? r = !1 : Gi(n) && (r = "leading"in n ? !!n.leading : r,
                        i = "trailing"in n ? !!n.trailing : i),
                        pi(e, t, {
                            leading: r,
                            maxWait: +t,
                            trailing: i
                        })
                    }
                    function yi(e, t) {
                        return t = null == t ? xo : t,
                        Bn(t, j, A, [e], [])
                    }
                    function bi(e, t, n, r) {
                        return t && "boolean" != typeof t && Zn(e, t, n) ? t = !1 : "function" == typeof t && (r = n,
                        n = t,
                        t = !1),
                        "function" == typeof n ? bt(e, t, an(n, r, 1)) : bt(e, t)
                    }
                    function Si(e, t, n) {
                        return "function" == typeof t ? bt(e, !0, an(t, n, 1)) : bt(e, !0)
                    }
                    function Pi(e, t) {
                        return e > t
                    }
                    function Ei(e, t) {
                        return e >= t
                    }
                    function Ai(e) {
                        return m(e) && $n(e) && ta.call(e, "callee") && !la.call(e, "callee")
                    }
                    function wi(e) {
                        return e === !0 || e === !1 || m(e) && ra.call(e) == q
                    }
                    function Mi(e) {
                        return m(e) && ra.call(e) == K
                    }
                    function xi(e) {
                        return !!e && 1 === e.nodeType && m(e) && !Fi(e)
                    }
                    function Ci(e) {
                        return null == e || ($n(e) && (Cs(e) || Vi(e) || Ai(e) || m(e) && Li(e.splice)) ? !e.length : !Fs(e).length)
                    }
                    function Ri(e, t, n, r) {
                        n = "function" == typeof n ? an(n, r, 3) : A;
                        var i = n ? n(e, t) : A;
                        return i === A ? Ot(e, t, n) : !!i
                    }
                    function Hi(e) {
                        return m(e) && "string" == typeof e.message && ra.call(e) == Y
                    }
                    function ji(e) {
                        return "number" == typeof e && ya(e)
                    }
                    function Li(e) {
                        return Gi(e) && ra.call(e) == Q
                    }
                    function Gi(e) {
                        var t = typeof e;
                        return !!e && ("object" == t || "function" == t)
                    }
                    function Oi(e, t, n, r) {
                        return n = "function" == typeof n ? an(n, r, 3) : A,
                        Bt(e, Wn(t), n)
                    }
                    function Ii(e) {
                        return Ni(e) && e != +e
                    }
                    function Bi(e) {
                        return null != e && (Li(e) ? oa.test(ea.call(e)) : m(e) && Ge.test(e))
                    }
                    function Di(e) {
                        return null === e
                    }
                    function Ni(e) {
                        return "number" == typeof e || m(e) && ra.call(e) == J
                    }
                    function Fi(e) {
                        var t;
                        if (!m(e) || ra.call(e) != Z || Ai(e) || !ta.call(e, "constructor") && (t = e.constructor,
                        "function" == typeof t && !(t instanceof t)))
                            return !1;
                        var n;
                        return Rt(e, function(e, t) {
                            n = t
                        }),
                        n === A || ta.call(e, n)
                    }
                    function ki(e) {
                        return Gi(e) && ra.call(e) == ee
                    }
                    function Vi(e) {
                        return "string" == typeof e || m(e) && ra.call(e) == ne
                    }
                    function Ui(e) {
                        return m(e) && nr(e.length) && !!Ve[ra.call(e)]
                    }
                    function Wi(e) {
                        return e === A
                    }
                    function Xi(e, t) {
                        return e < t
                    }
                    function zi(e, t) {
                        return e <= t
                    }
                    function qi(e) {
                        var t = e ? Va(e) : 0;
                        return nr(t) ? t ? et(e) : [] : oo(e)
                    }
                    function Ki(e) {
                        return Tt(e, eo(e))
                    }
                    function Yi(e, t, n) {
                        var r = Oa(e);
                        return n && Zn(e, t, n) && (t = A),
                        t ? mt(r, t) : r
                    }
                    function Qi(e) {
                        return Lt(e, eo(e))
                    }
                    function $i(e, t, n) {
                        var r = null == e ? A : Gt(e, fr(t), t + "");
                        return r === A ? n : r
                    }
                    function Ji(e, t) {
                        if (null == e)
                            return !1;
                        var n = ta.call(e, t);
                        if (!n && !er(t)) {
                            if (t = fr(t),
                            e = 1 == t.length ? e : Gt(e, Kt(t, 0, -1)),
                            null == e)
                                return !1;
                            t = wr(t),
                            n = ta.call(e, t)
                        }
                        return n || nr(e.length) && Jn(t, e.length) && (Cs(e) || Ai(e))
                    }
                    function Zi(e, t, n) {
                        n && Zn(e, t, n) && (t = A);
                        for (var r = -1, i = Fs(e), o = i.length, a = {}; ++r < o; ) {
                            var s = i[r]
                              , u = e[s];
                            t ? ta.call(a, u) ? a[u].push(s) : a[u] = [s] : a[u] = s
                        }
                        return a
                    }
                    function eo(e) {
                        if (null == e)
                            return [];
                        Gi(e) || (e = qo(e));
                        var t = e.length;
                        t = t && nr(t) && (Cs(e) || Ai(e)) && t || 0;
                        for (var n = e.constructor, r = -1, i = "function" == typeof n && n.prototype === e, o = ko(t), a = t > 0; ++r < t; )
                            o[r] = r + "";
                        for (var s in e)
                            a && Jn(s, t) || "constructor" == s && (i || !ta.call(e, s)) || o.push(s);
                        return o
                    }
                    function to(e) {
                        e = hr(e);
                        for (var t = -1, n = Fs(e), r = n.length, i = ko(r); ++t < r; ) {
                            var o = n[t];
                            i[t] = [o, e[o]]
                        }
                        return i
                    }
                    function no(e, t, n) {
                        var r = null == e ? A : e[t];
                        return r === A && (null == e || er(t, e) || (t = fr(t),
                        e = 1 == t.length ? e : Gt(e, Kt(t, 0, -1)),
                        r = null == e ? A : e[wr(t)]),
                        r = r === A ? n : r),
                        Li(r) ? r.call(e) : r
                    }
                    function ro(e, t, n) {
                        if (null == e)
                            return e;
                        var r = t + "";
                        t = null != e[r] || er(t, e) ? [r] : fr(t);
                        for (var i = -1, o = t.length, a = o - 1, s = e; null != s && ++i < o; ) {
                            var u = t[i];
                            Gi(s) && (i == a ? s[u] = n : null == s[u] && (s[u] = Jn(t[i + 1]) ? [] : {})),
                            s = s[u]
                        }
                        return e
                    }
                    function io(e, t, n, r) {
                        var i = Cs(e) || Ui(e);
                        if (t = kn(t, r, 4),
                        null == n)
                            if (i || Gi(e)) {
                                var o = e.constructor;
                                n = i ? Cs(e) ? new o : [] : Oa(Li(o) ? o.prototype : A)
                            } else
                                n = {};
                        return (i ? tt : Ht)(e, function(e, r, i) {
                            return t(n, e, r, i)
                        }),
                        n
                    }
                    function oo(e) {
                        return en(e, Fs(e))
                    }
                    function ao(e) {
                        return en(e, eo(e))
                    }
                    function so(e, t, n) {
                        return t = +t || 0,
                        n === A ? (n = t,
                        t = 0) : n = +n || 0,
                        e >= Pa(t, n) && e < Sa(t, n)
                    }
                    function uo(e, t, n) {
                        n && Zn(e, t, n) && (t = n = A);
                        var r = null == e
                          , i = null == t;
                        if (null == n && (i && "boolean" == typeof e ? (n = e,
                        e = 1) : "boolean" == typeof t && (n = t,
                        i = !0)),
                        r && i && (t = 1,
                        i = !1),
                        e = +e || 0,
                        i ? (t = e,
                        e = 0) : t = +t || 0,
                        n || e % 1 || t % 1) {
                            var o = wa();
                            return Pa(e + o * (t - e + ua("1e-" + ((o + "").length - 1))), t)
                        }
                        return zt(e, t)
                    }
                    function co(e) {
                        return e = s(e),
                        e && e.charAt(0).toUpperCase() + e.slice(1)
                    }
                    function lo(e) {
                        return e = s(e),
                        e && e.replace(Ie, f).replace(Ce, "")
                    }
                    function ho(e, t, n) {
                        e = s(e),
                        t += "";
                        var r = e.length;
                        return n = n === A ? r : Pa(n < 0 ? 0 : +n || 0, r),
                        n -= t.length,
                        n >= 0 && e.indexOf(t, n) == n
                    }
                    function fo(e) {
                        return e = s(e),
                        e && ye.test(e) ? e.replace(ge, p) : e
                    }
                    function po(e) {
                        return e = s(e),
                        e && xe.test(e) ? e.replace(Me, d) : e || "(?:)"
                    }
                    function vo(e, t, n) {
                        e = s(e),
                        t = +t;
                        var r = e.length;
                        if (r >= t || !ya(t))
                            return e;
                        var i = (t - r) / 2
                          , o = ga(i)
                          , a = _a(i);
                        return n = Ln("", a, n),
                        n.slice(0, o) + e + n
                    }
                    function _o(e, t, n) {
                        return (n ? Zn(e, t, n) : null == t) ? t = 0 : t && (t = +t),
                        e = yo(e),
                        Aa(e, t || (Le.test(e) ? 16 : 10))
                    }
                    function mo(e, t) {
                        var n = "";
                        if (e = s(e),
                        t = +t,
                        t < 1 || !e || !ya(t))
                            return n;
                        do
                            t % 2 && (n += e),
                            t = ga(t / 2),
                            e += e;
                        while (t);return n
                    }
                    function go(e, t, n) {
                        return e = s(e),
                        n = null == n ? 0 : Pa(n < 0 ? 0 : +n || 0, e.length),
                        e.lastIndexOf(t, n) == n
                    }
                    function To(e, n, r) {
                        var i = t.templateSettings;
                        r && Zn(e, n, r) && (n = r = A),
                        e = s(e),
                        n = _t(mt({}, r || n), i, vt);
                        var o, a, u = _t(mt({}, n.imports), i.imports, vt), c = Fs(u), l = en(u, c), h = 0, f = n.interpolate || Be, p = "__p += '", d = Ko((n.escape || Be).source + "|" + f.source + "|" + (f === Pe ? He : Be).source + "|" + (n.evaluate || Be).source + "|$", "g"), _ = "//# sourceURL=" + ("sourceURL"in n ? n.sourceURL : "lodash.templateSources[" + ++ke + "]") + "\n";
                        e.replace(d, function(t, n, r, i, s, u) {
                            return r || (r = i),
                            p += e.slice(h, u).replace(De, v),
                            n && (o = !0,
                            p += "' +\n__e(" + n + ") +\n'"),
                            s && (a = !0,
                            p += "';\n" + s + ";\n__p += '"),
                            r && (p += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"),
                            h = u + t.length,
                            t
                        }),
                        p += "';\n";
                        var m = n.variable;
                        m || (p = "with (obj) {\n" + p + "\n}\n"),
                        p = (a ? p.replace(de, "") : p).replace(ve, "$1").replace(_e, "$1;"),
                        p = "function(" + (m || "obj") + ") {\n" + (m ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (o ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + p + "return __p\n}";
                        var g = $s(function() {
                            return Wo(c, _ + "return " + p).apply(A, l)
                        });
                        if (g.source = p,
                        Hi(g))
                            throw g;
                        return g
                    }
                    function yo(e, t, n) {
                        var r = e;
                        return (e = s(e)) ? (n ? Zn(r, t, n) : null == t) ? e.slice(b(e), S(e) + 1) : (t += "",
                        e.slice(u(e, t), c(e, t) + 1)) : e
                    }
                    function bo(e, t, n) {
                        var r = e;
                        return e = s(e),
                        e ? (n ? Zn(r, t, n) : null == t) ? e.slice(b(e)) : e.slice(u(e, t + "")) : e
                    }
                    function So(e, t, n) {
                        var r = e;
                        return e = s(e),
                        e ? (n ? Zn(r, t, n) : null == t) ? e.slice(0, S(e) + 1) : e.slice(0, c(e, t + "") + 1) : e
                    }
                    function Po(e, t, n) {
                        n && Zn(e, t, n) && (t = A);
                        var r = I
                          , i = B;
                        if (null != t)
                            if (Gi(t)) {
                                var o = "separator"in t ? t.separator : o;
                                r = "length"in t ? +t.length || 0 : r,
                                i = "omission"in t ? s(t.omission) : i
                            } else
                                r = +t || 0;
                        if (e = s(e),
                        r >= e.length)
                            return e;
                        var a = r - i.length;
                        if (a < 1)
                            return i;
                        var u = e.slice(0, a);
                        if (null == o)
                            return u + i;
                        if (ki(o)) {
                            if (e.slice(a).search(o)) {
                                var c, l, h = e.slice(0, a);
                                for (o.global || (o = Ko(o.source, (je.exec(o) || "") + "g")),
                                o.lastIndex = 0; c = o.exec(h); )
                                    l = c.index;
                                u = u.slice(0, null == l ? a : l)
                            }
                        } else if (e.indexOf(o, a) != a) {
                            var f = u.lastIndexOf(o);
                            f > -1 && (u = u.slice(0, f))
                        }
                        return u + i
                    }
                    function Eo(e) {
                        return e = s(e),
                        e && Te.test(e) ? e.replace(me, P) : e
                    }
                    function Ao(e, t, n) {
                        return n && Zn(e, t, n) && (t = A),
                        e = s(e),
                        e.match(t || Ne) || []
                    }
                    function wo(e, t, n) {
                        return n && Zn(e, t, n) && (t = A),
                        m(e) ? Co(e) : yt(e, t)
                    }
                    function Mo(e) {
                        return function() {
                            return e
                        }
                    }
                    function xo(e) {
                        return e
                    }
                    function Co(e) {
                        return Nt(bt(e, !0))
                    }
                    function Ro(e, t) {
                        return Ft(e, bt(t, !0))
                    }
                    function Ho(e, t, n) {
                        if (null == n) {
                            var r = Gi(t)
                              , i = r ? Fs(t) : A
                              , o = i && i.length ? Lt(t, i) : A;
                            (o ? o.length : r) || (o = !1,
                            n = t,
                            t = e,
                            e = this)
                        }
                        o || (o = Lt(t, Fs(t)));
                        var a = !0
                          , s = -1
                          , u = Li(e)
                          , c = o.length;
                        n === !1 ? a = !1 : Gi(n) && "chain"in n && (a = n.chain);
                        for (; ++s < c; ) {
                            var l = o[s]
                              , h = t[l];
                            e[l] = h,
                            u && (e.prototype[l] = function(t) {
                                return function() {
                                    var n = this.__chain__;
                                    if (a || n) {
                                        var r = e(this.__wrapped__)
                                          , i = r.__actions__ = et(this.__actions__);
                                        return i.push({
                                            func: t,
                                            args: arguments,
                                            thisArg: e
                                        }),
                                        r.__chain__ = n,
                                        r
                                    }
                                    return t.apply(e, ct([this.value()], arguments))
                                }
                            }(h))
                        }
                        return e
                    }
                    function jo() {
                        return nt._ = ia,
                        this
                    }
                    function Lo() {}
                    function Go(e) {
                        return er(e) ? Ut(e) : Wt(e)
                    }
                    function Oo(e) {
                        return function(t) {
                            return Gt(e, fr(t), t + "")
                        }
                    }
                    function Io(e, t, n) {
                        n && Zn(e, t, n) && (t = n = A),
                        e = +e || 0,
                        n = null == n ? 1 : +n || 0,
                        null == t ? (t = e,
                        e = 0) : t = +t || 0;
                        for (var r = -1, i = Sa(_a((t - e) / (n || 1)), 0), o = ko(i); ++r < i; )
                            o[r] = e,
                            e += n;
                        return o
                    }
                    function Bo(e, t, n) {
                        if (e = ga(e),
                        e < 1 || !ya(e))
                            return [];
                        var r = -1
                          , i = ko(Pa(e, Ca));
                        for (t = an(t, n, 1); ++r < e; )
                            r < Ca ? i[r] = t(r) : t(r);
                        return i
                    }
                    function Do(e) {
                        var t = ++na;
                        return s(e) + t
                    }
                    function No(e, t) {
                        return (+e || 0) + (+t || 0)
                    }
                    function Fo(e, t, n) {
                        return n && Zn(e, t, n) && (t = A),
                        t = kn(t, n, 3),
                        1 == t.length ? pt(Cs(e) ? e : lr(e), t) : Jt(e, t)
                    }
                    e = e ? rt.defaults(nt.Object(), e, rt.pick(nt, Fe)) : nt;
                    var ko = e.Array
                      , Vo = e.Date
                      , Uo = e.Error
                      , Wo = e.Function
                      , Xo = e.Math
                      , zo = e.Number
                      , qo = e.Object
                      , Ko = e.RegExp
                      , Yo = e.String
                      , Qo = e.TypeError
                      , $o = ko.prototype
                      , Jo = qo.prototype
                      , Zo = Yo.prototype
                      , ea = Wo.prototype.toString
                      , ta = Jo.hasOwnProperty
                      , na = 0
                      , ra = Jo.toString
                      , ia = nt._
                      , oa = Ko("^" + ea.call(ta).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
                      , aa = e.ArrayBuffer
                      , sa = e.clearTimeout
                      , ua = e.parseFloat
                      , ca = Xo.pow
                      , la = Jo.propertyIsEnumerable
                      , ha = Xn(e, "Set")
                      , fa = e.setTimeout
                      , pa = $o.splice
                      , da = e.Uint8Array
                      , va = Xn(e, "WeakMap")
                      , _a = Xo.ceil
                      , ma = Xn(qo, "create")
                      , ga = Xo.floor
                      , Ta = Xn(ko, "isArray")
                      , ya = e.isFinite
                      , ba = Xn(qo, "keys")
                      , Sa = Xo.max
                      , Pa = Xo.min
                      , Ea = Xn(Vo, "now")
                      , Aa = e.parseInt
                      , wa = Xo.random
                      , Ma = zo.NEGATIVE_INFINITY
                      , xa = zo.POSITIVE_INFINITY
                      , Ca = 4294967295
                      , Ra = Ca - 1
                      , Ha = Ca >>> 1
                      , ja = 9007199254740991
                      , La = va && new va
                      , Ga = {};
                    t.support = {};
                    t.templateSettings = {
                        escape: be,
                        evaluate: Se,
                        interpolate: Pe,
                        variable: "",
                        imports: {
                            _: t
                        }
                    };
                    var Oa = function() {
                        function e() {}
                        return function(t) {
                            if (Gi(t)) {
                                e.prototype = t;
                                var n = new e;
                                e.prototype = A
                            }
                            return n || {}
                        }
                    }()
                      , Ia = fn(Ht)
                      , Ba = fn(jt, !0)
                      , Da = pn()
                      , Na = pn(!0)
                      , Fa = La ? function(e, t) {
                        return La.set(e, t),
                        e
                    }
                    : xo
                      , ka = La ? function(e) {
                        return La.get(e)
                    }
                    : Lo
                      , Va = Ut("length")
                      , Ua = function() {
                        var e = 0
                          , t = 0;
                        return function(n, r) {
                            var i = vs()
                              , o = N - (i - t);
                            if (t = i,
                            o > 0) {
                                if (++e >= D)
                                    return n
                            } else
                                e = 0;
                            return Fa(n, r)
                        }
                    }()
                      , Wa = mi(function(e, t) {
                        return m(e) && $n(e) ? Pt(e, Ct(t, !1, !0)) : []
                    })
                      , Xa = Sn()
                      , za = Sn(!0)
                      , qa = mi(function(e) {
                        for (var t = e.length, n = t, r = ko(h), i = Un(), a = i == o, s = []; n--; ) {
                            var u = e[n] = $n(u = e[n]) ? u : [];
                            r[n] = a && u.length >= 120 ? vn(n && u) : null
                        }
                        var c = e[0]
                          , l = -1
                          , h = c ? c.length : 0
                          , f = r[0];
                        e: for (; ++l < h; )
                            if (u = c[l],
                            (f ? $e(f, u) : i(s, u, 0)) < 0) {
                                for (var n = t; --n; ) {
                                    var p = r[n];
                                    if ((p ? $e(p, u) : i(e[n], u, 0)) < 0)
                                        continue e
                                }
                                f && f.push(u),
                                s.push(u)
                            }
                        return s
                    })
                      , Ka = mi(function(e, t) {
                        t = Ct(t);
                        var n = gt(e, t);
                        return Xt(e, t.sort(r)),
                        n
                    })
                      , Ya = In()
                      , Qa = In(!0)
                      , $a = mi(function(e) {
                        return Zt(Ct(e, !1, !0))
                    })
                      , Ja = mi(function(e, t) {
                        return $n(e) ? Pt(e, t) : []
                    })
                      , Za = mi(Br)
                      , es = mi(function(e) {
                        var t = e.length
                          , n = t > 2 ? e[t - 2] : A
                          , r = t > 1 ? e[t - 1] : A;
                        return t > 2 && "function" == typeof n ? t -= 2 : (n = t > 1 && "function" == typeof r ? (--t,
                        r) : A,
                        r = A),
                        e.length = t,
                        Dr(e, n, r)
                    })
                      , ts = mi(function(e) {
                        return e = Ct(e),
                        this.thru(function(t) {
                            return Ze(Cs(t) ? t : [hr(t)], e)
                        })
                    })
                      , ns = mi(function(e, t) {
                        return gt(e, Ct(t))
                    })
                      , rs = ln(function(e, t, n) {
                        ta.call(e, n) ? ++e[n] : e[n] = 1
                    })
                      , is = bn(Ia)
                      , os = bn(Ba, !0)
                      , as = An(tt, Ia)
                      , ss = An(it, Ba)
                      , us = ln(function(e, t, n) {
                        ta.call(e, n) ? e[n].push(t) : e[n] = [t]
                    })
                      , cs = ln(function(e, t, n) {
                        e[n] = t
                    })
                      , ls = mi(function(e, t, n) {
                        var r = -1
                          , i = "function" == typeof t
                          , o = er(t)
                          , a = $n(e) ? ko(e.length) : [];
                        return Ia(e, function(e) {
                            var s = i ? t : o && null != e ? e[t] : A;
                            a[++r] = s ? s.apply(e, n) : Qn(e, t, n)
                        }),
                        a
                    })
                      , hs = ln(function(e, t, n) {
                        e[n ? 0 : 1].push(t)
                    }, function() {
                        return [[], []]
                    })
                      , fs = Hn(lt, Ia)
                      , ps = Hn(ht, Ba)
                      , ds = mi(function(e, t) {
                        if (null == e)
                            return [];
                        var n = t[2];
                        return n && Zn(t[0], t[1], n) && (t.length = 1),
                        $t(e, Ct(t), [])
                    })
                      , vs = Ea || function() {
                        return (new Vo).getTime()
                    }
                      , _s = mi(function(e, t, n) {
                        var r = M;
                        if (n.length) {
                            var i = T(n, _s.placeholder);
                            r |= j
                        }
                        return Bn(e, r, t, n, i)
                    })
                      , ms = mi(function(e, t) {
                        t = t.length ? Ct(t) : Qi(e);
                        for (var n = -1, r = t.length; ++n < r; ) {
                            var i = t[n];
                            e[i] = Bn(e[i], M, e)
                        }
                        return e
                    })
                      , gs = mi(function(e, t, n) {
                        var r = M | x;
                        if (n.length) {
                            var i = T(n, gs.placeholder);
                            r |= j
                        }
                        return Bn(t, r, e, n, i)
                    })
                      , Ts = gn(R)
                      , ys = gn(H)
                      , bs = mi(function(e, t) {
                        return St(e, 1, t)
                    })
                      , Ss = mi(function(e, t, n) {
                        return St(e, t, n)
                    })
                      , Ps = En()
                      , Es = En(!0)
                      , As = mi(function(e, t) {
                        if (t = Ct(t),
                        "function" != typeof e || !ot(t, a))
                            throw new Qo(U);
                        var n = t.length;
                        return mi(function(r) {
                            for (var i = Pa(r.length, n); i--; )
                                r[i] = t[i](r[i]);
                            return e.apply(this, r)
                        })
                    })
                      , ws = Rn(j)
                      , Ms = Rn(L)
                      , xs = mi(function(e, t) {
                        return Bn(e, O, A, A, A, Ct(t))
                    })
                      , Cs = Ta || function(e) {
                        return m(e) && nr(e.length) && ra.call(e) == z
                    }
                      , Rs = hn(kt)
                      , Hs = hn(function(e, t, n) {
                        return n ? _t(e, t, n) : mt(e, t)
                    })
                      , js = Tn(Hs, dt)
                      , Ls = Tn(Rs, or)
                      , Gs = Pn(Ht)
                      , Os = Pn(jt)
                      , Is = wn(Da)
                      , Bs = wn(Na)
                      , Ds = Mn(Ht)
                      , Ns = Mn(jt)
                      , Fs = ba ? function(e) {
                        var t = null == e ? A : e.constructor;
                        return "function" == typeof t && t.prototype === e || "function" != typeof e && $n(e) ? cr(e) : Gi(e) ? ba(e) : []
                    }
                    : cr
                      , ks = xn(!0)
                      , Vs = xn()
                      , Us = mi(function(e, t) {
                        if (null == e)
                            return {};
                        if ("function" != typeof t[0]) {
                            var t = ut(Ct(t), Yo);
                            return ar(e, Pt(eo(e), t))
                        }
                        var n = an(t[0], t[1], 3);
                        return sr(e, function(e, t, r) {
                            return !n(e, t, r)
                        })
                    })
                      , Ws = mi(function(e, t) {
                        return null == e ? {} : "function" == typeof t[0] ? sr(e, an(t[0], t[1], 3)) : ar(e, Ct(t))
                    })
                      , Xs = _n(function(e, t, n) {
                        return t = t.toLowerCase(),
                        e + (n ? t.charAt(0).toUpperCase() + t.slice(1) : t)
                    })
                      , zs = _n(function(e, t, n) {
                        return e + (n ? "-" : "") + t.toLowerCase()
                    })
                      , qs = Cn()
                      , Ks = Cn(!0)
                      , Ys = _n(function(e, t, n) {
                        return e + (n ? "_" : "") + t.toLowerCase()
                    })
                      , Qs = _n(function(e, t, n) {
                        return e + (n ? " " : "") + (t.charAt(0).toUpperCase() + t.slice(1))
                    })
                      , $s = mi(function(e, t) {
                        try {
                            return e.apply(A, t)
                        } catch (n) {
                            return Hi(n) ? n : new Uo(n)
                        }
                    })
                      , Js = mi(function(e, t) {
                        return function(n) {
                            return Qn(n, e, t)
                        }
                    })
                      , Zs = mi(function(e, t) {
                        return function(n) {
                            return Qn(e, n, t)
                        }
                    })
                      , eu = On("ceil")
                      , tu = On("floor")
                      , nu = yn(Pi, Ma)
                      , ru = yn(Xi, xa)
                      , iu = On("round");
                    return t.prototype = n.prototype,
                    g.prototype = Oa(n.prototype),
                    g.prototype.constructor = g,
                    $.prototype = Oa(n.prototype),
                    $.prototype.constructor = $,
                    Xe.prototype["delete"] = ze,
                    Xe.prototype.get = qe,
                    Xe.prototype.has = Ke,
                    Xe.prototype.set = Ye,
                    Qe.prototype.push = Je,
                    di.Cache = Xe,
                    t.after = li,
                    t.ary = hi,
                    t.assign = Hs,
                    t.at = ns,
                    t.before = fi,
                    t.bind = _s,
                    t.bindAll = ms,
                    t.bindKey = gs,
                    t.callback = wo,
                    t.chain = kr,
                    t.chunk = dr,
                    t.compact = vr,
                    t.constant = Mo,
                    t.countBy = rs,
                    t.create = Yi,
                    t.curry = Ts,
                    t.curryRight = ys,
                    t.debounce = pi,
                    t.defaults = js,
                    t.defaultsDeep = Ls,
                    t.defer = bs,
                    t.delay = Ss,
                    t.difference = Wa,
                    t.drop = _r,
                    t.dropRight = mr,
                    t.dropRightWhile = gr,
                    t.dropWhile = Tr,
                    t.fill = yr,
                    t.filter = $r,
                    t.flatten = Sr,
                    t.flattenDeep = Pr,
                    t.flow = Ps,
                    t.flowRight = Es,
                    t.forEach = as,
                    t.forEachRight = ss,
                    t.forIn = Is,
                    t.forInRight = Bs,
                    t.forOwn = Ds,
                    t.forOwnRight = Ns,
                    t.functions = Qi,
                    t.groupBy = us,
                    t.indexBy = cs,
                    t.initial = Ar,
                    t.intersection = qa,
                    t.invert = Zi,
                    t.invoke = ls,
                    t.keys = Fs,
                    t.keysIn = eo,
                    t.map = ei,
                    t.mapKeys = ks,
                    t.mapValues = Vs,
                    t.matches = Co,
                    t.matchesProperty = Ro,
                    t.memoize = di,
                    t.merge = Rs,
                    t.method = Js,
                    t.methodOf = Zs,
                    t.mixin = Ho,
                    t.modArgs = As,
                    t.negate = vi,
                    t.omit = Us,
                    t.once = _i,
                    t.pairs = to,
                    t.partial = ws,
                    t.partialRight = Ms,
                    t.partition = hs,
                    t.pick = Ws,
                    t.pluck = ti,
                    t.property = Go,
                    t.propertyOf = Oo,
                    t.pull = xr,
                    t.pullAt = Ka,
                    t.range = Io,
                    t.rearg = xs,
                    t.reject = ni,
                    t.remove = Cr,
                    t.rest = Rr,
                    t.restParam = mi,
                    t.set = ro,
                    t.shuffle = ii,
                    t.slice = Hr,
                    t.sortBy = si,
                    t.sortByAll = ds,
                    t.sortByOrder = ui,
                    t.spread = gi,
                    t.take = jr,
                    t.takeRight = Lr,
                    t.takeRightWhile = Gr,
                    t.takeWhile = Or,
                    t.tap = Vr,
                    t.throttle = Ti,
                    t.thru = Ur,
                    t.times = Bo,
                    t.toArray = qi,
                    t.toPlainObject = Ki,
                    t.transform = io,
                    t.union = $a,
                    t.uniq = Ir,
                    t.unzip = Br,
                    t.unzipWith = Dr,
                    t.values = oo,
                    t.valuesIn = ao,
                    t.where = ci,
                    t.without = Ja,
                    t.wrap = yi,
                    t.xor = Nr,
                    t.zip = Za,
                    t.zipObject = Fr,
                    t.zipWith = es,
                    t.backflow = Es,
                    t.collect = ei,
                    t.compose = Es,
                    t.each = as,
                    t.eachRight = ss,
                    t.extend = Hs,
                    t.iteratee = wo,
                    t.methods = Qi,
                    t.object = Fr,
                    t.select = $r,
                    t.tail = Rr,
                    t.unique = Ir,
                    Ho(t, t),
                    t.add = No,
                    t.attempt = $s,
                    t.camelCase = Xs,
                    t.capitalize = co,
                    t.ceil = eu,
                    t.clone = bi,
                    t.cloneDeep = Si,
                    t.deburr = lo,
                    t.endsWith = ho,
                    t.escape = fo,
                    t.escapeRegExp = po,
                    t.every = Qr,
                    t.find = is,
                    t.findIndex = Xa,
                    t.findKey = Gs,
                    t.findLast = os,
                    t.findLastIndex = za,
                    t.findLastKey = Os,
                    t.findWhere = Jr,
                    t.first = br,
                    t.floor = tu,
                    t.get = $i,
                    t.gt = Pi,
                    t.gte = Ei,
                    t.has = Ji,
                    t.identity = xo,
                    t.includes = Zr,
                    t.indexOf = Er,
                    t.inRange = so,
                    t.isArguments = Ai,
                    t.isArray = Cs,
                    t.isBoolean = wi,
                    t.isDate = Mi,
                    t.isElement = xi,
                    t.isEmpty = Ci,
                    t.isEqual = Ri,
                    t.isError = Hi,
                    t.isFinite = ji,
                    t.isFunction = Li,
                    t.isMatch = Oi,
                    t.isNaN = Ii,
                    t.isNative = Bi,
                    t.isNull = Di,
                    t.isNumber = Ni,
                    t.isObject = Gi,
                    t.isPlainObject = Fi,
                    t.isRegExp = ki,
                    t.isString = Vi,
                    t.isTypedArray = Ui,
                    t.isUndefined = Wi,
                    t.kebabCase = zs,
                    t.last = wr,
                    t.lastIndexOf = Mr,
                    t.lt = Xi,
                    t.lte = zi,
                    t.max = nu,
                    t.min = ru,
                    t.noConflict = jo,
                    t.noop = Lo,
                    t.now = vs,
                    t.pad = vo,
                    t.padLeft = qs,
                    t.padRight = Ks,
                    t.parseInt = _o,
                    t.random = uo,
                    t.reduce = fs,
                    t.reduceRight = ps,
                    t.repeat = mo,
                    t.result = no,
                    t.round = iu,
                    t.runInContext = E,
                    t.size = oi,
                    t.snakeCase = Ys,
                    t.some = ai,
                    t.sortedIndex = Ya,
                    t.sortedLastIndex = Qa,
                    t.startCase = Qs,
                    t.startsWith = go,
                    t.sum = Fo,
                    t.template = To,
                    t.trim = yo,
                    t.trimLeft = bo,
                    t.trimRight = So,
                    t.trunc = Po,
                    t.unescape = Eo,
                    t.uniqueId = Do,
                    t.words = Ao,
                    t.all = Qr,
                    t.any = ai,
                    t.contains = Zr,
                    t.eq = Ri,
                    t.detect = is,
                    t.foldl = fs,
                    t.foldr = ps,
                    t.head = br,
                    t.include = Zr,
                    t.inject = fs,
                    Ho(t, function() {
                        var e = {};
                        return Ht(t, function(n, r) {
                            t.prototype[r] || (e[r] = n)
                        }),
                        e
                    }(), !1),
                    t.sample = ri,
                    t.prototype.sample = function(e) {
                        return this.__chain__ || null != e ? this.thru(function(t) {
                            return ri(t, e)
                        }) : ri(this.value())
                    }
                    ,
                    t.VERSION = w,
                    tt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                        t[e].placeholder = t
                    }),
                    tt(["drop", "take"], function(e, t) {
                        $.prototype[e] = function(n) {
                            var r = this.__filtered__;
                            if (r && !t)
                                return new $(this);
                            n = null == n ? 1 : Sa(ga(n) || 0, 0);
                            var i = this.clone();
                            return r ? i.__takeCount__ = Pa(i.__takeCount__, n) : i.__views__.push({
                                size: n,
                                type: e + (i.__dir__ < 0 ? "Right" : "")
                            }),
                            i
                        }
                        ,
                        $.prototype[e + "Right"] = function(t) {
                            return this.reverse()[e](t).reverse()
                        }
                    }),
                    tt(["filter", "map", "takeWhile"], function(e, t) {
                        var n = t + 1
                          , r = n != V;
                        $.prototype[e] = function(e, t) {
                            var i = this.clone();
                            return i.__iteratees__.push({
                                iteratee: kn(e, t, 1),
                                type: n
                            }),
                            i.__filtered__ = i.__filtered__ || r,
                            i
                        }
                    }),
                    tt(["first", "last"], function(e, t) {
                        var n = "take" + (t ? "Right" : "");
                        $.prototype[e] = function() {
                            return this[n](1).value()[0]
                        }
                    }),
                    tt(["initial", "rest"], function(e, t) {
                        var n = "drop" + (t ? "" : "Right");
                        $.prototype[e] = function() {
                            return this.__filtered__ ? new $(this) : this[n](1)
                        }
                    }),
                    tt(["pluck", "where"], function(e, t) {
                        var n = t ? "filter" : "map"
                          , r = t ? Nt : Go;
                        $.prototype[e] = function(e) {
                            return this[n](r(e))
                        }
                    }),
                    $.prototype.compact = function() {
                        return this.filter(xo)
                    }
                    ,
                    $.prototype.reject = function(e, t) {
                        return e = kn(e, t, 1),
                        this.filter(function(t) {
                            return !e(t)
                        })
                    }
                    ,
                    $.prototype.slice = function(e, t) {
                        e = null == e ? 0 : +e || 0;
                        var n = this;
                        return n.__filtered__ && (e > 0 || t < 0) ? new $(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)),
                        t !== A && (t = +t || 0,
                        n = t < 0 ? n.dropRight(-t) : n.take(t - e)),
                        n)
                    }
                    ,
                    $.prototype.takeRightWhile = function(e, t) {
                        return this.reverse().takeWhile(e, t).reverse()
                    }
                    ,
                    $.prototype.toArray = function() {
                        return this.take(xa)
                    }
                    ,
                    Ht($.prototype, function(e, n) {
                        var r = /^(?:filter|map|reject)|While$/.test(n)
                          , i = /^(?:first|last)$/.test(n)
                          , o = t[i ? "take" + ("last" == n ? "Right" : "") : n];
                        o && (t.prototype[n] = function() {
                            var t = i ? [1] : arguments
                              , n = this.__chain__
                              , a = this.__wrapped__
                              , s = !!this.__actions__.length
                              , u = a instanceof $
                              , c = t[0]
                              , l = u || Cs(a);
                            l && r && "function" == typeof c && 1 != c.length && (u = l = !1);
                            var h = function(e) {
                                return i && n ? o(e, 1)[0] : o.apply(A, ct([e], t))
                            }
                              , f = {
                                func: Ur,
                                args: [h],
                                thisArg: A
                            }
                              , p = u && !s;
                            if (i && !n)
                                return p ? (a = a.clone(),
                                a.__actions__.push(f),
                                e.call(a)) : o.call(A, this.value())[0];
                            if (!i && l) {
                                a = p ? a : new $(this);
                                var d = e.apply(a, t);
                                return d.__actions__.push(f),
                                new g(d,n)
                            }
                            return this.thru(h)
                        }
                        )
                    }),
                    tt(["join", "pop", "push", "replace", "shift", "sort", "splice", "split", "unshift"], function(e) {
                        var n = (/^(?:replace|split)$/.test(e) ? Zo : $o)[e]
                          , r = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                          , i = /^(?:join|pop|replace|shift)$/.test(e);
                        t.prototype[e] = function() {
                            var e = arguments;
                            return i && !this.__chain__ ? n.apply(this.value(), e) : this[r](function(t) {
                                return n.apply(t, e)
                            })
                        }
                    }),
                    Ht($.prototype, function(e, n) {
                        var r = t[n];
                        if (r) {
                            var i = r.name
                              , o = Ga[i] || (Ga[i] = []);
                            o.push({
                                name: n,
                                func: r
                            })
                        }
                    }),
                    Ga[jn(A, x).name] = [{
                        name: "wrapper",
                        func: A
                    }],
                    $.prototype.clone = te,
                    $.prototype.reverse = re,
                    $.prototype.value = We,
                    t.prototype.chain = Wr,
                    t.prototype.commit = Xr,
                    t.prototype.concat = ts,
                    t.prototype.plant = zr,
                    t.prototype.reverse = qr,
                    t.prototype.toString = Kr,
                    t.prototype.run = t.prototype.toJSON = t.prototype.valueOf = t.prototype.value = Yr,
                    t.prototype.collect = t.prototype.map,
                    t.prototype.head = t.prototype.first,
                    t.prototype.select = t.prototype.filter,
                    t.prototype.tail = t.prototype.rest,
                    t
                }
                var A, w = "3.10.1", M = 1, x = 2, C = 4, R = 8, H = 16, j = 32, L = 64, G = 128, O = 256, I = 30, B = "...", D = 150, N = 16, F = 200, k = 1, V = 2, U = "Expected a function", W = "__lodash_placeholder__", X = "[object Arguments]", z = "[object Array]", q = "[object Boolean]", K = "[object Date]", Y = "[object Error]", Q = "[object Function]", $ = "[object Map]", J = "[object Number]", Z = "[object Object]", ee = "[object RegExp]", te = "[object Set]", ne = "[object String]", re = "[object WeakMap]", ie = "[object ArrayBuffer]", oe = "[object Float32Array]", ae = "[object Float64Array]", se = "[object Int8Array]", ue = "[object Int16Array]", ce = "[object Int32Array]", le = "[object Uint8Array]", he = "[object Uint8ClampedArray]", fe = "[object Uint16Array]", pe = "[object Uint32Array]", de = /\b__p \+= '';/g, ve = /\b(__p \+=) '' \+/g, _e = /(__e\(.*?\)|\b__t\)) \+\n'';/g, me = /&(?:amp|lt|gt|quot|#39|#96);/g, ge = /[&<>"'`]/g, Te = RegExp(me.source), ye = RegExp(ge.source), be = /<%-([\s\S]+?)%>/g, Se = /<%([\s\S]+?)%>/g, Pe = /<%=([\s\S]+?)%>/g, Ee = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/, Ae = /^\w*$/, we = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g, Me = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g, xe = RegExp(Me.source), Ce = /[\u0300-\u036f\ufe20-\ufe23]/g, Re = /\\(\\)?/g, He = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, je = /\w*$/, Le = /^0[xX]/, Ge = /^\[object .+?Constructor\]$/, Oe = /^\d+$/, Ie = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g, Be = /($^)/, De = /['\n\r\u2028\u2029\\]/g, Ne = function() {
                    var e = "[A-Z\\xc0-\\xd6\\xd8-\\xde]"
                      , t = "[a-z\\xdf-\\xf6\\xf8-\\xff]+";
                    return RegExp(e + "+(?=" + e + t + ")|" + e + "?" + t + "|" + e + "+|[0-9]+", "g")
                }(), Fe = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "_", "clearTimeout", "isFinite", "parseFloat", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap"], ke = -1, Ve = {};
                Ve[oe] = Ve[ae] = Ve[se] = Ve[ue] = Ve[ce] = Ve[le] = Ve[he] = Ve[fe] = Ve[pe] = !0,
                Ve[X] = Ve[z] = Ve[ie] = Ve[q] = Ve[K] = Ve[Y] = Ve[Q] = Ve[$] = Ve[J] = Ve[Z] = Ve[ee] = Ve[te] = Ve[ne] = Ve[re] = !1;
                var Ue = {};
                Ue[X] = Ue[z] = Ue[ie] = Ue[q] = Ue[K] = Ue[oe] = Ue[ae] = Ue[se] = Ue[ue] = Ue[ce] = Ue[J] = Ue[Z] = Ue[ee] = Ue[ne] = Ue[le] = Ue[he] = Ue[fe] = Ue[pe] = !0,
                Ue[Y] = Ue[Q] = Ue[$] = Ue[te] = Ue[re] = !1;
                var We = {
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ã": "A",
                    "Ä": "A",
                    "Å": "A",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ã": "a",
                    "ä": "a",
                    "å": "a",
                    "Ç": "C",
                    "ç": "c",
                    "Ð": "D",
                    "ð": "d",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ë": "E",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ë": "e",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ï": "I",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ï": "i",
                    "Ñ": "N",
                    "ñ": "n",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Õ": "O",
                    "Ö": "O",
                    "Ø": "O",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "õ": "o",
                    "ö": "o",
                    "ø": "o",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ü": "U",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ü": "u",
                    "Ý": "Y",
                    "ý": "y",
                    "ÿ": "y",
                    "Æ": "Ae",
                    "æ": "ae",
                    "Þ": "Th",
                    "þ": "th",
                    "ß": "ss"
                }
                  , Xe = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "`": "&#96;"
                }
                  , ze = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'",
                    "&#96;": "`"
                }
                  , qe = {
                    "function": !0,
                    object: !0
                }
                  , Ke = {
                    0: "x30",
                    1: "x31",
                    2: "x32",
                    3: "x33",
                    4: "x34",
                    5: "x35",
                    6: "x36",
                    7: "x37",
                    8: "x38",
                    9: "x39",
                    A: "x41",
                    B: "x42",
                    C: "x43",
                    D: "x44",
                    E: "x45",
                    F: "x46",
                    a: "x61",
                    b: "x62",
                    c: "x63",
                    d: "x64",
                    e: "x65",
                    f: "x66",
                    n: "x6e",
                    r: "x72",
                    t: "x74",
                    u: "x75",
                    v: "x76",
                    x: "x78"
                }
                  , Ye = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }
                  , Qe = qe[typeof n] && n && !n.nodeType && n
                  , $e = qe[typeof t] && t && !t.nodeType && t
                  , Je = Qe && $e && "object" == typeof e && e && e.Object && e
                  , Ze = qe[typeof self] && self && self.Object && self
                  , et = qe[typeof window] && window && window.Object && window
                  , tt = $e && $e.exports === Qe && Qe
                  , nt = Je || et !== (this && this.window) && et || Ze || this
                  , rt = E();
                "function" == typeof define && "object" == typeof define.amd && define.amd ? (nt._ = rt,
                define(function() {
                    return rt
                })) : Qe && $e ? tt ? ($e.exports = rt)._ = rt : Qe._ = rt : nt._ = rt
            }
            ).call(this)
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    26: [function(e, t, n) {
        function r(e) {
            return e.replace(/[\/]+/g, "/").replace(/\/\?/g, "?").replace(/\/\#/g, "#").replace(/\:\//g, "://")
        }
        t.exports = function() {
            var e = [].slice.call(arguments, 0).join("/");
            return r(e)
        }
    }
    , {}],
    27: [function(e, t, n) {
        arguments[4][22][0].apply(n, arguments)
    }
    , {
        22: 22,
        30: 30
    }],
    28: [function(e, t, n) {
        (function(r, i) {
            !function(e, r) {
                "object" == typeof n && "undefined" != typeof t ? t.exports = r() : "function" == typeof define && define.amd ? define(r) : e.ES6Promise = r()
            }(this, function() {
                "use strict";
                function t(e) {
                    return "function" == typeof e || "object" == typeof e && null !== e
                }
                function n(e) {
                    return "function" == typeof e
                }
                function o(e) {
                    Y = e
                }
                function a(e) {
                    Q = e
                }
                function s() {
                    return function() {
                        return r.nextTick(f)
                    }
                }
                function u() {
                    return "undefined" != typeof K ? function() {
                        K(f)
                    }
                    : h()
                }
                function c() {
                    var e = 0
                      , t = new Z(f)
                      , n = document.createTextNode("");
                    return t.observe(n, {
                        characterData: !0
                    }),
                    function() {
                        n.data = e = ++e % 2
                    }
                }
                function l() {
                    var e = new MessageChannel;
                    return e.port1.onmessage = f,
                    function() {
                        return e.port2.postMessage(0)
                    }
                }
                function h() {
                    var e = setTimeout;
                    return function() {
                        return e(f, 1)
                    }
                }
                function f() {
                    for (var e = 0; e < q; e += 2) {
                        var t = ne[e]
                          , n = ne[e + 1];
                        t(n),
                        ne[e] = void 0,
                        ne[e + 1] = void 0
                    }
                    q = 0
                }
                function p() {
                    try {
                        var t = e
                          , n = t("vertx");
                        return K = n.runOnLoop || n.runOnContext,
                        u()
                    } catch (r) {
                        return h()
                    }
                }
                function d(e, t) {
                    var n = arguments
                      , r = this
                      , i = new this.constructor(_);
                    void 0 === i[ie] && O(i);
                    var o = r._state;
                    return o ? !function() {
                        var e = n[o - 1];
                        Q(function() {
                            return j(o, i, e, r._result)
                        })
                    }() : x(r, i, e, t),
                    i
                }
                function v(e) {
                    var t = this;
                    if (e && "object" == typeof e && e.constructor === t)
                        return e;
                    var n = new t(_);
                    return E(n, e),
                    n
                }
                function _() {}
                function m() {
                    return new TypeError("You cannot resolve a promise with itself")
                }
                function g() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }
                function T(e) {
                    try {
                        return e.then
                    } catch (t) {
                        return ue.error = t,
                        ue
                    }
                }
                function y(e, t, n, r) {
                    try {
                        e.call(t, n, r)
                    } catch (i) {
                        return i
                    }
                }
                function b(e, t, n) {
                    Q(function(e) {
                        var r = !1
                          , i = y(n, t, function(n) {
                            r || (r = !0,
                            t !== n ? E(e, n) : w(e, n))
                        }, function(t) {
                            r || (r = !0,
                            M(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                        !r && i && (r = !0,
                        M(e, i))
                    }, e)
                }
                function S(e, t) {
                    t._state === ae ? w(e, t._result) : t._state === se ? M(e, t._result) : x(t, void 0, function(t) {
                        return E(e, t)
                    }, function(t) {
                        return M(e, t)
                    })
                }
                function P(e, t, r) {
                    t.constructor === e.constructor && r === d && t.constructor.resolve === v ? S(e, t) : r === ue ? M(e, ue.error) : void 0 === r ? w(e, t) : n(r) ? b(e, t, r) : w(e, t)
                }
                function E(e, n) {
                    e === n ? M(e, m()) : t(n) ? P(e, n, T(n)) : w(e, n)
                }
                function A(e) {
                    e._onerror && e._onerror(e._result),
                    C(e)
                }
                function w(e, t) {
                    e._state === oe && (e._result = t,
                    e._state = ae,
                    0 !== e._subscribers.length && Q(C, e))
                }
                function M(e, t) {
                    e._state === oe && (e._state = se,
                    e._result = t,
                    Q(A, e))
                }
                function x(e, t, n, r) {
                    var i = e._subscribers
                      , o = i.length;
                    e._onerror = null,
                    i[o] = t,
                    i[o + ae] = n,
                    i[o + se] = r,
                    0 === o && e._state && Q(C, e)
                }
                function C(e) {
                    var t = e._subscribers
                      , n = e._state;
                    if (0 !== t.length) {
                        for (var r = void 0, i = void 0, o = e._result, a = 0; a < t.length; a += 3)
                            r = t[a],
                            i = t[a + n],
                            r ? j(n, r, i, o) : i(o);
                        e._subscribers.length = 0
                    }
                }
                function R() {
                    this.error = null
                }
                function H(e, t) {
                    try {
                        return e(t)
                    } catch (n) {
                        return ce.error = n,
                        ce
                    }
                }
                function j(e, t, r, i) {
                    var o = n(r)
                      , a = void 0
                      , s = void 0
                      , u = void 0
                      , c = void 0;
                    if (o) {
                        if (a = H(r, i),
                        a === ce ? (c = !0,
                        s = a.error,
                        a = null) : u = !0,
                        t === a)
                            return void M(t, g())
                    } else
                        a = i,
                        u = !0;
                    t._state !== oe || (o && u ? E(t, a) : c ? M(t, s) : e === ae ? w(t, a) : e === se && M(t, a))
                }
                function L(e, t) {
                    try {
                        t(function(t) {
                            E(e, t)
                        }, function(t) {
                            M(e, t)
                        })
                    } catch (n) {
                        M(e, n)
                    }
                }
                function G() {
                    return le++
                }
                function O(e) {
                    e[ie] = le++,
                    e._state = void 0,
                    e._result = void 0,
                    e._subscribers = []
                }
                function I(e, t) {
                    this._instanceConstructor = e,
                    this.promise = new e(_),
                    this.promise[ie] || O(this.promise),
                    z(t) ? (this._input = t,
                    this.length = t.length,
                    this._remaining = t.length,
                    this._result = new Array(this.length),
                    0 === this.length ? w(this.promise, this._result) : (this.length = this.length || 0,
                    this._enumerate(),
                    0 === this._remaining && w(this.promise, this._result))) : M(this.promise, B())
                }
                function B() {
                    return new Error("Array Methods must be provided an Array")
                }
                function D(e) {
                    return new I(this,e).promise
                }
                function N(e) {
                    var t = this;
                    return new t(z(e) ? function(n, r) {
                        for (var i = e.length, o = 0; o < i; o++)
                            t.resolve(e[o]).then(n, r)
                    }
                    : function(e, t) {
                        return t(new TypeError("You must pass an array to race."))
                    }
                    )
                }
                function F(e) {
                    var t = this
                      , n = new t(_);
                    return M(n, e),
                    n
                }
                function k() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }
                function V() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }
                function U(e) {
                    this[ie] = G(),
                    this._result = this._state = void 0,
                    this._subscribers = [],
                    _ !== e && ("function" != typeof e && k(),
                    this instanceof U ? L(this, e) : V())
                }
                function W() {
                    var e = void 0;
                    if ("undefined" != typeof i)
                        e = i;
                    else if ("undefined" != typeof self)
                        e = self;
                    else
                        try {
                            e = Function("return this")()
                        } catch (t) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                    var n = e.Promise;
                    if (n) {
                        var r = null;
                        try {
                            r = Object.prototype.toString.call(n.resolve())
                        } catch (t) {}
                        if ("[object Promise]" === r && !n.cast)
                            return
                    }
                    e.Promise = U
                }
                var X = void 0;
                X = Array.isArray ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                ;
                var z = X
                  , q = 0
                  , K = void 0
                  , Y = void 0
                  , Q = function(e, t) {
                    ne[q] = e,
                    ne[q + 1] = t,
                    q += 2,
                    2 === q && (Y ? Y(f) : re())
                }
                  , $ = "undefined" != typeof window ? window : void 0
                  , J = $ || {}
                  , Z = J.MutationObserver || J.WebKitMutationObserver
                  , ee = "undefined" == typeof self && "undefined" != typeof r && "[object process]" === {}.toString.call(r)
                  , te = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
                  , ne = new Array(1e3)
                  , re = void 0;
                re = ee ? s() : Z ? c() : te ? l() : void 0 === $ && "function" == typeof e ? p() : h();
                var ie = Math.random().toString(36).substring(16)
                  , oe = void 0
                  , ae = 1
                  , se = 2
                  , ue = new R
                  , ce = new R
                  , le = 0;
                return I.prototype._enumerate = function() {
                    for (var e = this.length, t = this._input, n = 0; this._state === oe && n < e; n++)
                        this._eachEntry(t[n], n)
                }
                ,
                I.prototype._eachEntry = function(e, t) {
                    var n = this._instanceConstructor
                      , r = n.resolve;
                    if (r === v) {
                        var i = T(e);
                        if (i === d && e._state !== oe)
                            this._settledAt(e._state, t, e._result);
                        else if ("function" != typeof i)
                            this._remaining--,
                            this._result[t] = e;
                        else if (n === U) {
                            var o = new n(_);
                            P(o, e, i),
                            this._willSettleAt(o, t)
                        } else
                            this._willSettleAt(new n(function(t) {
                                return t(e)
                            }
                            ), t)
                    } else
                        this._willSettleAt(r(e), t)
                }
                ,
                I.prototype._settledAt = function(e, t, n) {
                    var r = this.promise;
                    r._state === oe && (this._remaining--,
                    e === se ? M(r, n) : this._result[t] = n),
                    0 === this._remaining && w(r, this._result)
                }
                ,
                I.prototype._willSettleAt = function(e, t) {
                    var n = this;
                    x(e, void 0, function(e) {
                        return n._settledAt(ae, t, e)
                    }, function(e) {
                        return n._settledAt(se, t, e)
                    })
                }
                ,
                U.all = D,
                U.race = N,
                U.resolve = v,
                U.reject = F,
                U._setScheduler = o,
                U._setAsap = a,
                U._asap = Q,
                U.prototype = {
                    constructor: U,
                    then: d,
                    "catch": function(e) {
                        return this.then(null, e)
                    }
                },
                U.polyfill = W,
                U.Promise = U,
                U
            })
        }
        ).call(this, e("30"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        30: 30
    }],
    29: [function(e, t, n) {
        (function(e) {
            function t(e, t) {
                for (var n = 0, r = e.length - 1; r >= 0; r--) {
                    var i = e[r];
                    "." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1),
                    n++) : n && (e.splice(r, 1),
                    n--)
                }
                if (t)
                    for (; n--; n)
                        e.unshift("..");
                return e
            }
            function r(e, t) {
                if (e.filter)
                    return e.filter(t);
                for (var n = [], r = 0; r < e.length; r++)
                    t(e[r], r, e) && n.push(e[r]);
                return n
            }
            var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
              , o = function(e) {
                return i.exec(e).slice(1)
            };
            n.resolve = function() {
                for (var n = "", i = !1, o = arguments.length - 1; o >= -1 && !i; o--) {
                    var a = o >= 0 ? arguments[o] : e.cwd();
                    if ("string" != typeof a)
                        throw new TypeError("Arguments to path.resolve must be strings");
                    a && (n = a + "/" + n,
                    i = "/" === a.charAt(0))
                }
                return n = t(r(n.split("/"), function(e) {
                    return !!e
                }), !i).join("/"),
                (i ? "/" : "") + n || "."
            }
            ,
            n.normalize = function(e) {
                var i = n.isAbsolute(e)
                  , o = "/" === a(e, -1);
                return e = t(r(e.split("/"), function(e) {
                    return !!e
                }), !i).join("/"),
                e || i || (e = "."),
                e && o && (e += "/"),
                (i ? "/" : "") + e
            }
            ,
            n.isAbsolute = function(e) {
                return "/" === e.charAt(0)
            }
            ,
            n.join = function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return n.normalize(r(e, function(e, t) {
                    if ("string" != typeof e)
                        throw new TypeError("Arguments to path.join must be strings");
                    return e
                }).join("/"))
            }
            ,
            n.relative = function(e, t) {
                function r(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++)
                        ;
                    for (var n = e.length - 1; n >= 0 && "" === e[n]; n--)
                        ;
                    return t > n ? [] : e.slice(t, n - t + 1)
                }
                e = n.resolve(e).substr(1),
                t = n.resolve(t).substr(1);
                for (var i = r(e.split("/")), o = r(t.split("/")), a = Math.min(i.length, o.length), s = a, u = 0; u < a; u++)
                    if (i[u] !== o[u]) {
                        s = u;
                        break
                    }
                for (var c = [], u = s; u < i.length; u++)
                    c.push("..");
                return c = c.concat(o.slice(s)),
                c.join("/")
            }
            ,
            n.sep = "/",
            n.delimiter = ":",
            n.dirname = function(e) {
                var t = o(e)
                  , n = t[0]
                  , r = t[1];
                return n || r ? (r && (r = r.substr(0, r.length - 1)),
                n + r) : "."
            }
            ,
            n.basename = function(e, t) {
                var n = o(e)[2];
                return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)),
                n
            }
            ,
            n.extname = function(e) {
                return o(e)[3]
            }
            ;
            var a = "b" === "ab".substr(-1) ? function(e, t, n) {
                return e.substr(t, n)
            }
            : function(e, t, n) {
                return t < 0 && (t = e.length + t),
                e.substr(t, n)
            }
        }
        ).call(this, e("30"))
    }
    , {
        30: 30
    }],
    30: [function(e, t, n) {
        function r() {
            throw new Error("setTimeout has not been defined")
        }
        function i() {
            throw new Error("clearTimeout has not been defined")
        }
        function o(e) {
            if (h === setTimeout)
                return setTimeout(e, 0);
            if ((h === r || !h) && setTimeout)
                return h = setTimeout,
                setTimeout(e, 0);
            try {
                return h(e, 0)
            } catch (t) {
                try {
                    return h.call(null, e, 0)
                } catch (t) {
                    return h.call(this, e, 0)
                }
            }
        }
        function a(e) {
            if (f === clearTimeout)
                return clearTimeout(e);
            if ((f === i || !f) && clearTimeout)
                return f = clearTimeout,
                clearTimeout(e);
            try {
                return f(e)
            } catch (t) {
                try {
                    return f.call(null, e)
                } catch (t) {
                    return f.call(this, e)
                }
            }
        }
        function s() {
            _ && d && (_ = !1,
            d.length ? v = d.concat(v) : m = -1,
            v.length && u())
        }
        function u() {
            if (!_) {
                var e = o(s);
                _ = !0;
                for (var t = v.length; t; ) {
                    for (d = v,
                    v = []; ++m < t; )
                        d && d[m].run();
                    m = -1,
                    t = v.length
                }
                d = null,
                _ = !1,
                a(e)
            }
        }
        function c(e, t) {
            this.fun = e,
            this.array = t
        }
        function l() {}
        var h, f, p = t.exports = {};
        !function() {
            try {
                h = "function" == typeof setTimeout ? setTimeout : r
            } catch (e) {
                h = r
            }
            try {
                f = "function" == typeof clearTimeout ? clearTimeout : i
            } catch (e) {
                f = i
            }
        }();
        var d, v = [], _ = !1, m = -1;
        p.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++)
                    t[n - 1] = arguments[n];
            v.push(new c(e,t)),
            1 !== v.length || _ || o(u)
        }
        ,
        c.prototype.run = function() {
            this.fun.apply(null, this.array)
        }
        ,
        p.title = "browser",
        p.browser = !0,
        p.env = {},
        p.argv = [],
        p.version = "",
        p.versions = {},
        p.on = l,
        p.addListener = l,
        p.once = l,
        p.off = l,
        p.removeListener = l,
        p.removeAllListeners = l,
        p.emit = l,
        p.binding = function(e) {
            throw new Error("process.binding is not supported")
        }
        ,
        p.cwd = function() {
            return "/"
        }
        ,
        p.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }
        ,
        p.umask = function() {
            return 0
        }
    }
    , {}],
    31: [function(e, t, n) {
        function r(e, t, n, r) {
            var i = e.pageX - t.x
              , o = e.pageY - t.y
              , a = {
                x: i / n * 2 - 1,
                y: 1 - o / r * 2
            };
            return a
        }
        var i = e("1")
          , o = e("11")
          , a = e("46")
          , s = (e("13"),
        e("36"))
          , u = e("49")
          , c = (e("38"),
        e("50"))
          , l = e("47")
          , h = e("48")
          , f = e("45")
          , p = (e("43"),
        e("51"))
          , d = e("32")
          , v = function(e) {
            i.call(this, e)
        }
          , m = {
            levier: "manual",
            siege_avant_droite: "leather"
        }
          , g = {
            ecran: {},
            elegance: {},
            rear: {},
            sunroof: {},
            levier: {
                auto: ["levier2"],
                manual: ["levier"]
            },
            siege_avant_droite: {
                leather: ["siege_avant", "siege_avant_droite", "sieges_arriere"],
                cloth: ["siege_avant2", "siege_avant_droite2", "sieges_arriere2"],
                leathercloth: ["siege_avant3", "siege_avant_droite3", "sieges_arriere3"]
            }
        };
        v.inherit(i, {
            init: function(e) {
                this.scene.updateMatrixWorld(!0),
                this.pointerLock = e.pointerLock,
                this.$container = $(document.body),
                this.updateContainerInfo(),
                this.initCamera(),
                this.initControls(),
                this.initObjectPicker(),
                this.handleMouseEvents(),
                this.initMaterials(),
                this.initSceneController(),
                this.initUI(),
                this.enterCar(),
                $(window).trigger("resize"),
                this.camera.far = 5e3,
                this.camera.updateProjectionMatrix(),
                this.gloveBoxRotation = {
                    z: 0
                },
                this.gloveBoxTween = new TWEEN.Tween,
                this.renderer.autoClear = !1,
                this.firstRender = !0
            },
            initControls: function() {
                this.initSpinner(),
                this.initCrosshair(),
                this.webvr = new p,
                WebVRConfig.TOUCH_PANNER_DISABLED = !1,
                this.camera.matrixWorld2 = new THREE.Matrix4
            },
            initMaterials: function() {
                this.scene.traverse(function(e) {
                    var t = e.material;
                    if (e instanceof THREE.Mesh && t.name.indexOf("ui_") !== -1) {
                        var n = new f
                          , r = t.map;
                        r.wrapS = r.wrapT = THREE.ClampToEdgeWrapping,
                        n.map = r,
                        n.uniforms.diffuse.value.copy(t.color),
                        n.transparent = t.transparent,
                        n.side = t.side,
                        n.uniforms.offsetRepeat.value.set(r.offset.x, r.offset.y, r.repeat.x, r.repeat.y),
                        e.material = n,
                        "ui_line" === t.name && (e.material.animDuration /= 5,
                        e.material.easing = TWEEN.Easing.Linear.None)
                    }
                    e.material && "coutures_siege_avant" === e.material.name && (e.material.polygonOffset = !0,
                    e.material.polygonOffsetFactor = -10,
                    e.material.polygonOffsetUnits = 1)
                })
            },
            initSlideshow: function() {
                var e = this.envScene.getObjectByName("slideshow");
                this.envScene.updateMatrixWorld(!0);
                var t = e.getWorldPosition()
                  , n = e.getWorldQuaternion()
                  , r = e.getWorldScale();
                this.slideShow = new h(e),
                this.scene.add(e),
                e.position.copy(t),
                e.quaternion.copy(n),
                e.scale.copy(r)
            },
            initVideo: function() {
                var e = window.canPlayInlineVideo ? "kadjar" : "kadjar-360p";
                this.video = document.createElement("video"),
                window.canPlayInlineVideo && $(this.video).attr("playsinline", ""),
                this.videoFile = "" === this.video.canPlayType("video/ogg") ? e + ".mp4" : e + ".ogv",
                this.video.src = "videos/" + this.videoFile,
                this.video.load(),
                this.video.volume = .7,
                this.video.addEventListener("ended", function() {
                    this.videoObject.children[0].visible = !0,
                    this.videoObject.children[0].material.map.offset.set(0, .5),
                    this.video.playing = !1,
                    this.music = d.loop("music"),
                    this.videoObject.material.map = this.videoPosterImage,
                    d.fadeInSound(this.music, .7)
                }
                .bind(this)),
                this.videoImage = document.createElement("canvas"),
                this.videoImage.width = 256,
                this.videoImage.height = 256,
                this.videoImageContext = this.videoImage.getContext("2d"),
                this.videoTexture = new THREE.Texture(this.videoImage),
                this.videoTexture.minFilter = THREE.LinearFilter,
                this.videoTexture.magFilter = THREE.LinearFilter,
                this.videoObject = this.envScene.getObjectByName("video"),
                this.videoPosterImage = this.videoObject.material.map,
                this.envScene.updateMatrixWorld(!0);
                var t = this.videoObject.getWorldPosition()
                  , n = this.videoObject.getWorldQuaternion()
                  , r = this.videoObject.getWorldScale();
                this.scene.add(this.videoObject),
                this.videoObject.position.copy(t),
                this.videoObject.quaternion.copy(n),
                this.videoObject.scale.copy(r),
                this.picker.add("video", this.scene)
            },
            playVideo: function() {
                window.canPlayInlineVideo && (this.videoObject.material.map = this.videoTexture),
                this.videoObject.children[0].visible = !1,
                this.video.play(),
                this.video.playing = !0,
                d.fadeOutSound(this.music)
            },
            getMaterialByName: function(e) {
                return _.find(this.scene.materials, function(t) {
                    return t.name === e
                })
            },
            initObjectPicker: function() {
                this.picker = new a({
                    camera: this.camera,
                    checkFlag: !0
                })
            },
            handleMouseEvents: function() {
                window.isMobile || $(window).on("mousemove", function(e) {
                    var t = r(e, this.containerOffset, this.containerWidth, this.containerHeight);
                    this.picker.updateMouseCoords(t)
                }
                .bind(this))
            },
            updateContainerInfo: function() {
                this.containerOffset = {
                    x: this.$container.offset().left,
                    y: this.$container.offset().top
                },
                this.containerWidth = this.$container.width(),
                this.containerHeight = this.$container.height()
            },
            startAudio: function() {
                this.musicInterval = setInterval(function() {
                    this.audioLoaded && (this.music = d.loop("music"),
                    clearInterval(this.musicInterval))
                }
                .bind(this), 500)
            },
            enterCar: function() {
                var e = ["levier", "levier2", "levier_auto", "levier_manual", "ecran", "siege_avant_droite", "leather", "cloth", "leathercloth", "text", "elegance", "rear", "sunroof", "glovebox"];
                this.scene.getObjectByName("colliders").visible = !1,
                this.eye ? this.scene.add(this.eye) : this.scene.add(this.camera),
                this.scene.remove(this.camera),
                this.crosshair.scale.set(1.2, 1.2, 1.2),
                this.spinner.scale.set(1.2, 1.2, 1.2),
                this.crosshair.position.z = -.5,
                this.spinner.position.z = -.5,
                this.crosshair.material.color.setHex(16777215),
                this.picker.clear(),
                this.picker.add(e, this.scene),
                this.ui.hideAll(),
                this.picker.on("enter", function(e) {
                    if (this.ui.isText(e) || this.$container.addClass("hovering"),
                    e === this.videoObject) {
                        if (this.video.playing)
                            return;
                        this.videoObject.children[0].material.map.offset.set(0, 0),
                        d.play("hover")
                    } else
                        this.ui.enterObject(e)
                }, this),
                this.picker.on("leave", function(e) {
                    this.$container.removeClass("hovering"),
                    e === this.videoObject && (this.video.playing || this.videoObject.children[0].material.map.offset.set(0, .5)),
                    this.ui.leaveObject(e)
                }, this),
                this.picker.on("pick", function(e) {
                    e !== this.videoObject || this.video.playing ? "glovebox" === e.name ? this.toggleGloveBox() : this.ui.pickObject(e) : this.playVideo()
                }, this),
                this.initVideo(),
                this.initSlideshow(),
                this.sceneController.initHotspots(),
                d.play("entercar"),
                this.enteredCar = !0,
                this.initCubemaps();
                var t = this.scene.getObjectByName("glovebox_cache")
                  , n = this.gloveBox = this.scene.getObjectByName("glovebox")
                  , r = this.scene.getObjectByName("glovebox_container");
                t.renderOrder = 100,
                n.renderOrder = 101,
                r.renderOrder = 101
            },
            toggleGloveBox: function() {
                this.gloveBoxOpen ? this.closeGloveBox() : this.openGloveBox()
            },
            openGloveBox: function() {
                this.gloveBoxOpen || (this.gloveBoxOpen = !0,
                this.sceneController.hideHotspot("glovebox"),
                this.ui.hideCurrentPanel(),
                this.gloveBoxTween.reset(this.gloveBoxRotation).to({
                    z: THREE.Math.degToRad(27)
                }, 750).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(e) {
                    this.gloveBox.rotation.z = this.gloveBoxRotation.z
                }
                .bind(this)).start(),
                d.play("openglovebox"))
            },
            closeGloveBox: function() {
                if (this.gloveBoxOpen) {
                    var e = this.gloveBoxTween.getProgress() || 0;
                    this.gloveBoxOpen = !1,
                    this.gloveBoxTween.reset(this.gloveBoxRotation).to({
                        z: 0
                    }, 750 * e).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                        this.gloveBox.rotation.z = this.gloveBoxRotation.z
                    }
                    .bind(this)).onComplete(function() {
                        this.sceneController.showHotspot("glovebox"),
                        d.play("closeglovebox")
                    }
                    .bind(this)).start()
                }
            },
            initCubemaps: function() {
                function e(e) {
                    var t = "textures/cubemaps/"
                      , n = _.map([o.getTexture(t + e + "/posx.jpg"), o.getTexture(t + "common/negx.jpg"), o.getTexture(t + "common/posy.jpg"), o.getTexture(t + e + "/negy.jpg"), o.getTexture(t + e + "/posz.jpg"), o.getTexture(t + "common/negz.jpg")], function(e) {
                        return e.image
                    })
                      , r = new THREE.CubeTexture(n);
                    return r.needsUpdate = !0,
                    r
                }
                this.cubemaps = {
                    manual_leather: e("manual-leather"),
                    manual_cloth: e("manual-cloth"),
                    manual_leathercloth: e("manual-leathercloth"),
                    auto_leather: e("auto-leather"),
                    auto_cloth: e("auto-cloth"),
                    auto_leathercloth: e("auto-leathercloth")
                },
                this.updateCubemap()
            },
            updateCubemap: function() {
                this.scene.background = this.cubemaps[m.levier + "_" + m.siege_avant_droite]
            },
            initSceneController: function() {
                this.sceneController = new l(this.scene,g)
            },
            initUI: function() {
                this.ui = new c(this.scene,g),
                this.ui.hideAll(),
                this.ui.on("showObject", function(e, t) {
                    m[e] = t,
                    this.updateCubemap()
                }, this),
                this.ui.on("showPanel", function(e) {
                    this.sceneController.hideHotspot(e)
                }, this),
                this.ui.on("hidePanel", function(e) {
                    this.sceneController.showHotspot(e)
                }, this)
            },
            getMaterial: function(e) {
                return _.find(this.scene.materials, function(t) {
                    return t.name === e
                })
            },
            initCamera: function() {
                this.camera = this.scene.getObjectByName("Main Camera")
            },
            initCrosshair: function() {
                this.crosshair = new s
            },
            initSpinner: function() {
                this.spinner = new u
            },
            teleportTo: function(e) {
                this.controls instanceof VRControls && (this.controls.setPosition(e),
                this.controls.setOrientation(e))
            },
            updatePicking: function() {
                !window.isMobile && this.picker && this.picker.update()
            },
            updateUI: function(e) {
                this.ui.update(e)
            },
            updateCamera: function() {
                var e = new THREE.Matrix4
                  , t = new THREE.Vector3
                  , n = new THREE.Quaternion
                  , r = new THREE.Vector3;
                return function() {
                    var i = this.webvr.getFrameData();
                    i && (e.fromArray(i.leftViewMatrix),
                    this.camera.matrixWorld.getInverse(e),
                    this.camera.matrixWorld.decompose(t, n, r),
                    n.multiplyQuaternions(this.camera.quaternion, n).normalize(),
                    this.camera.matrixWorld.compose(this.camera.position, n, r),
                    this.camera.matrixAutoUpdate = !1,
                    this.camera.matrixWorldNeedsUpdate = !1,
                    this.camera.matrixWorld2.copy(this.camera.matrixWorld))
                }
            }(),
            update: function(e) {
                this.controls && this.controls.update(e.delta),
                this.eye && this.eye.updateMatrixWorld(!0),
                this.updatePicking(),
                this.updateUI(e),
                this.sceneController.update(e),
                this.video && this.video.playing && window.canPlayInlineVideo && this.updateVideo(e.elapsed),
                this.scene.mixer && this.scene.mixer.update(e.delta),
                i.prototype.update.call(this, e),
                this.updateCamera()
            },
            updateVideo: function() {
                var e = (new THREE.Frustum,
                new THREE.Matrix4,
                1 / 24)
                  , t = 0;
                return function(n) {
                    n - t < e || this.video.readyState === this.video.HAVE_ENOUGH_DATA && (this.videoImageContext.drawImage(this.video, 0, 0, this.videoImage.width, this.videoImage.height),
                    this.videoTexture && (this.videoTexture.needsUpdate = !0),
                    t = n)
                }
            }(),
            render: function(e) {
                if (this.camera) {
                    if (!this.preRendered)
                        return void this.preRender();
                    this.renderer.clear(),
                    this.enteredCar ? this.renderScene(this.scene, this.camera) : this.renderScene(this.startScene, this.camera),
                    this.firstRender && ($(this.renderer.domElement).show(),
                    this.firstRender = !1,
                    $(window).trigger("resize"))
                }
            },
            preRender: function() {
                this.scene.traverse(function(e) {
                    e.frustumCulled = !1,
                    e.wasVisible = e.visible,
                    e.visible = !0
                }),
                this.renderScene(this.scene, this.camera),
                this.scene.traverse(function(e) {
                    e.frustumCulled = !0,
                    e.visible = e.wasVisible,
                    delete e.wasVisible
                }),
                this.preRendered = !0
            }
        }),
        t.exports = v
    }
    , {
        1: 1,
        11: 11,
        13: 13,
        32: 32,
        36: 36,
        38: 38,
        43: 43,
        45: 45,
        46: 46,
        47: 47,
        48: 48,
        49: 49,
        50: 50,
        51: 51
    }],
    32: [function(e, t, n) {
        var r = e("41")
          , i = e("27")
          , o = ["music", "panel", "button", "hover", "entercar", "openglovebox", "closeglovebox"]
          , a = {
            init: function() {
                this.tweens = {
                    fade: new TWEEN.Tween
                }
            },
            play: function(e, t, n) {
                var n = void 0 !== n ? n : 1;
                return r.play(e, {
                    volume: n,
                    pan: 1e-4,
                    loop: void 0 !== t && t
                })
            },
            stop: function() {
                r.stop()
            },
            fadeOutSound: function(e) {
                e && this.tweens.fade.reset(e).to({
                    volume: 0
                }, 1e3).start()
            },
            fadeInSound: function(e, t) {
                var t = void 0 !== t ? t : 1;
                e && this.tweens.fade.reset(e).to({
                    volume: t
                }, 1e3).start()
            },
            loop: function(e) {
                return this.play(e, !0, .5)
            },
            mute: function() {
                r.muted = !0
            },
            unmute: function() {
                r.muted = !1
            },
            toggle: function() {
                r.muted = !r.muted
            },
            isMuted: function() {
                return r.muted
            }
        };
        a.init(),
        t.exports = a
    }
    , {
        27: 27,
        41: 41
    }],
    33: [function(e, t, n) {
        t.exports = {
            "basic.fs": "#ifdef USE_MAP\n  varying vec2 vUv;\n\n  uniform sampler2D map;\n#endif\n\nuniform vec3 diffuse;\nuniform float opacity;\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, opacity);\n\n  #ifdef USE_MAP\n    vec4 mapTexel = texture2D(map, vUv, -2.0);\n\n    gl_FragColor *= mapTexel;\n  #endif\n}",
            "basic.vs": "#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 offsetRepeat;\n#endif\n\nvoid main() {\n  #ifdef USE_MAP\n    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n  #endif\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",
            "pbr.fs": "#define MOBILE\n#define LUV\n\nuniform float uAOPBRFactor;\nuniform float uAlbedoPBRFactor;\nuniform float uEnvironmentExposure;\nuniform float uGlossinessPBRFactor;\nuniform float uMetalnessPBRFactor;\nuniform float uNormalMapFactor;\nuniform float uOpacityFactor;\nuniform float uSpecularF0Factor;\n\nuniform vec3 uColor;\nuniform float uAlphaTest;\nuniform float uContrast;\n\nuniform int uFlipY;\nuniform int uOccludeSpecular;\nuniform int uOutputLinear;\n\nuniform samplerCube sSpecularPBR;\nuniform sampler2D sPanoramaPBR;\n\nuniform sampler2D sTextureAlbedoMap;\nuniform sampler2D sTextureNormalMap;\nuniform sampler2D sTextureNormalMap2;\nuniform sampler2D sTextureAOMap;\nuniform sampler2D sTexturePBRMaps;\nuniform sampler2D sTextureLightMap;\n\nuniform vec2 uTextureEnvironmentSpecularPBRLodRange;\nuniform vec2 uTextureEnvironmentSpecularPBRTextureSize;\nuniform vec3 uDiffuseSPH[9];\nuniform mat4 uEnvironmentTransform;\n\n// varying vec3 FragPosition;\nvarying vec3 FragNormal;\nvarying vec4 FragTangent;\nvarying vec4 FragEyeVector;\nvarying vec2 vUv;\n#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif\n\n\n// references\n// https://www.khronos.org/registry/gles/extensions/EXT/EXT_sRGB.txt\n\n// approximation\n// http://chilliant.blogspot.fr/2012/08/srgb-approximations-for-hlsl.html\nfloat linearTosRGB(const in float c) {\n  if (c >= 1.0) return 1.0;\n  float S1 = sqrt(c);\n  float S2 = sqrt(S1);\n  float S3 = sqrt(S2);\n  return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * c;\n}\n\nvec3 linearTosRGB(const in vec3 c) {\n  // vec3 cm = min(c, 1.0);\n  vec3 cm = c;\n  vec3 S1 = sqrt(cm);\n  vec3 S2 = sqrt(S1);\n  vec3 S3 = sqrt(S2);\n  return 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm;\n}\n\nvec4 linearTosRGB(const in vec4 c) {\n  vec3 cm = min(c.rgb, 1.0);\n  vec3 S1 = sqrt(cm);\n  vec3 S2 = sqrt(S1);\n  vec3 S3 = sqrt(S2);\n  return vec4(0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * cm, c.a);\n}\n\nfloat sRGBToLinear(const in float c) {\n  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);\n}\n\nvec3 sRGBToLinear(const in vec3 c) {\n  return c * (c * (c * 0.305306011 + 0.682171111) + 0.012522878);\n}\n\nvec4 sRGBToLinear(const in vec4 c) {\n  return vec4(c.rgb * (c.rgb * (c.rgb * 0.305306011 + 0.682171111) + 0.012522878), c.a);\n}\n\n//http://graphicrants.blogspot.fr/2009/04/rgbm-color-encoding.html\nvec3 RGBMToRGB(const in vec4 rgba) {\n  const float maxRange = 8.0;\n  return rgba.rgb * maxRange * rgba.a;\n}\n\nconst mat3 LUVInverse = mat3(6.0013,    -2.700,   -1.7995,\n                -1.332,    3.1029,   -5.7720,\n                0.3007,    -1.088,    5.6268);\n\nvec3 LUVToRGB(const in vec4 vLogLuv) {\n  float Le = vLogLuv.z * 255.0 + vLogLuv.w;\n  vec3 Xp_Y_XYZp;\n  Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n  Xp_Y_XYZp.z = Xp_Y_XYZp.y / vLogLuv.y;\n  Xp_Y_XYZp.x = vLogLuv.x * Xp_Y_XYZp.z;\n  vec3 vRGB = LUVInverse * Xp_Y_XYZp;\n  return max(vRGB, 0.0);\n}\n\n// http://graphicrants.blogspot.fr/2009/04/rgbm-color-encoding.html\nvec4 encodeRGBM(const in vec3 col, const in float range) {\n  if(range <= 0.0)\n    return vec4(col, 1.0);\n  vec4 rgbm;\n  vec3 color = col / range;\n  rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);\n  rgbm.a = ceil(rgbm.a * 255.0) / 255.0;\n  rgbm.rgb = color / rgbm.a;\n  return rgbm;\n}\n\nvec3 decodeRGBM(const in vec4 col, const in float range) {\n  if(range <= 0.0)\n    return col.rgb;\n  return range * col.rgb * col.a;\n}\n\nvec3 textureRGB(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).rgb;\n}\n\nvec4 textureRGBA(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).rgba;\n}\n\nfloat textureIntensity(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv).r;\n}\n\nfloat textureAlpha(const in sampler2D texture, const in vec2 uv) {\n  return texture2D(texture, uv.xy).a;\n}\n\nfloat adjustSpecular(const in float specular, const in vec3 normal) {\n  // Based on The Order : 1886 SIGGRAPH course notes implementation (page 21 notes)\n  float normalLen = length(normal);\n  if (normalLen < 1.0) {\n    float normalLen2 = normalLen * normalLen;\n    float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);\n    // http://www.frostbite.com/2014/11/moving-frostbite-to-pbr/\n    // page 91 : they use 0.5/kappa instead\n    return 1.0-min(1.0, sqrt((1.0-specular) * (1.0-specular) + 1.0/kappa));\n  }\n  return specular;\n}\n\nvec3 mtexNspaceTangent(const in vec4 tangent, const in vec3 normal, const in vec3 texnormal) {\n  vec3 tang = vec3(0.0,1.0,0.0);\n  float l = length(tangent.xyz);\n  if (l != 0.0) {\n    //normalize reusing length computations\n    // tang =  normalize(tangent.xyz);\n    tang =  tangent.xyz / l;\n  }\n  vec3 B = tangent.w * normalize(cross(normal, tang));\n  return normalize(texnormal.x*tang + texnormal.y*B + texnormal.z*normal);\n}\n\nvec2 normalMatcap(const in vec3 normal, const in vec3 nm_z) {\n  vec3 nm_x = vec3(-nm_z.z, 0.0, nm_z.x);\n  vec3 nm_y = cross(nm_x, nm_z);\n  return vec2(dot(normal.xz, nm_x.xz), dot(normal, nm_y)) * vec2(0.5)  + vec2(0.5) ; //MADD vector form\n}\n\nvec3 rgbToNormal(const in vec3 texel, const in int flipNormalY) {\n  vec3 rgb = texel * vec3(2.0) + vec3(-1.0); // MADD vec form\n  rgb[1] = flipNormalY == 1 ? -rgb[1] : rgb[1];\n  return rgb;\n}\n\nvec3 bumpMap(const in vec4 tangent, const in vec3 normal, const in vec2 gradient) {\n  vec3 outnormal;\n  float l = length(tangent.xyz);\n  if (l != 0.0) {\n    //normalize reusing length computations\n    // vec3 tang =  normalize(tangent.xyz);\n    vec3 tang =  tangent.xyz / l;\n    vec3 binormal = tangent.w * normalize(cross(normal, tang));\n    outnormal = normal + gradient.x * tang + gradient.y * binormal;\n  }\n  else {\n     outnormal = vec3(normal.x + gradient.x, normal.y + gradient.y, normal.z);\n  }\n  return normalize(outnormal);\n}\n\nfloat specularOcclusion(const in int occlude, const in float ao, const in vec3 N, const in vec3 V) {\n  if(occlude == 0)\n    return 1.0;\n  // Yoshiharu Gotanda's specular occlusion approximation:\n  // cf http://research.tri-ace.com/Data/cedec2011_RealtimePBR_Implementation_e.pptx pg59\n  float d = dot(N, V) + ao;\n  return clamp((d * d) - 1.0 + ao, 0.0, 1.0);\n}\n\nfloat adjustRoughnessNormalMap(const in float roughness, const in vec3 normal) {\n  // Based on The Order : 1886 SIGGRAPH course notes implementation (page 21 notes)\n  float normalLen = length(normal);\n  if (normalLen < 1.0) {\n    float normalLen2 = normalLen * normalLen;\n    float kappa = (3.0 * normalLen -  normalLen2 * normalLen)/(1.0 - normalLen2);\n    // http://www.frostbite.com/2014/11/moving-frostbite-to-pbr/\n    // page 91 : they use 0.5/kappa instead\n    return min(1.0, sqrt(roughness * roughness + 1.0/kappa));\n  }\n  return roughness;\n}\n\nfloat adjustRoughnessGeometry(const in float roughness, const in vec3 normal) {\n  // Geometric Specular Aliasing (slide 43)\n  // http://alex.vlachos.com/graphics/Alex_Vlachos_Advanced_VR_Rendering_GDC2015.pdf\n// #ifdef GL_OES_standard_derivatives\n//     vec3 vDx = dFdx(normal.xyz);\n//     vec3 vDy = dFdy(normal.xyz);\n//     return max(roughness, pow(clamp(max(dot(vDx, vDx), dot(vDy, vDy)), 0.0, 1.0), 0.333));\n// #else\n  return roughness;\n// #endif\n}\n\nmat3 environmentTransformPBR(const in mat4 tr) {\n  // TODO trick from animation matrix transpose?\n  vec3 x = vec3(tr[0][0], tr[1][0], tr[2][0]);\n  vec3 y = vec3(tr[0][1], tr[1][1], tr[2][1]);\n  vec3 z = vec3(tr[0][2], tr[1][2], tr[2][2]);\n  mat3 m = mat3(x, y, z);\n  return m;\n}\n\nvec3 evaluateDiffuseSphericalHarmonics(const in vec3 s[9], const in mat3 envTrans, const in vec3 N) {\n  vec3 n = envTrans * N;\n  // https://github.com/cedricpinson/envtools/blob/master/Cubemap.cpp#L523\n  vec3 result = (s[0]+s[1]*n.y+s[2]*n.z+s[3]*n.x+s[4]*n.y*n.x+s[5]*n.y*n.z+s[6]*(3.0*n.z*n.z-1.0)+s[7]*(n.z*n.x)+s[8]*(n.x*n.x-n.y*n.y));\n  return max(result, vec3(0.0));\n}\n\n// Frostbite, Lagarde paper p67\n// http://www.frostbite.com/wp-content/uploads/2014/11/course_notes_moving_frostbite_to_pbr.pdf\nfloat linRoughnessToMipmap(const in float roughnessLinear) {\n  return sqrt(roughnessLinear);\n}\n\nvec3 integrateBRDF(const in vec3 specular, const in float r, const in float NoV, const in sampler2D tex) {\n  vec4 rgba = texture2D(tex, vec2(NoV, r));\n  float b = (rgba[3] * 65280.0 + rgba[2] * 255.0);\n  float a = (rgba[1] * 65280.0 + rgba[0] * 255.0);\n  const float div = 1.0/65535.0;\n  return (specular * a + b) * div;\n}\n\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\n// TODO should we use somehow specular f0 ?\nvec3 integrateBRDFApprox(const in vec3 specular, const in float roughness, const in float NoV) {\n  const vec4 c0 = vec4(-1, -0.0275, -0.572, 0.022);\n  const vec4 c1 = vec4(1, 0.0425, 1.04, -0.04);\n  vec4 r = roughness * c0 + c1;\n  float a004 = min(r.x * r.x, exp2(-9.28 * NoV)) * r.x + r.y;\n  vec2 AB = vec2(-1.04, 1.04) * a004 + r.zw;\n  return specular * AB.x + AB.y;\n}\n\nvec3 computeIBLDiffuseUE4(const in vec3 normal, const in vec3 albedo, const in mat3 envTrans, const in vec3 sphHarm[9]) {\n  return albedo * evaluateDiffuseSphericalHarmonics(sphHarm, envTrans, normal) ;\n}\n\n\n#ifdef CUBEMAP\nvec3 textureCubemapLod(const in samplerCube texture, const in vec3 dir, const in float lod) {\n  vec4 rgba = textureCubeLodEXT(texture, dir, lod);\n#ifdef FLOAT\n  return rgba.rgb;\n#endif\n#ifdef RGBM\n  return RGBMToRGB(rgba);\n#endif\n#ifdef LUV\n  return LUVToRGB(rgba);\n#endif\n}\n\nvec3 textureCubeLodEXTFixed(const in samplerCube texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLod) {\n  vec3 dir = direction;\n  float lod = min(maxLod, lodInput);\n\n  // http://seblagarde.wordpress.com/2012/06/10/amd-cubemapgen-for-physically-based-rendering/\n  float scale = 1.0 - exp2(lod) / size.x;\n  vec3 absDir = abs(dir);\n  float M = max(max(absDir.x, absDir.y), absDir.z);\n\n  if (absDir.x != M) dir.x *= scale;\n  if (absDir.y != M) dir.y *= scale;\n  if (absDir.z != M) dir.z *= scale;\n\n  return textureCubemapLod(texture, dir, lod);\n}\n\nvec3 prefilterEnvMapCube(const in float rLinear, const in vec3 R, const in samplerCube tex, const in vec2 lodRange, const in vec2 size){\n  float lod = linRoughnessToMipmap(rLinear) * lodRange[1];\n  return textureCubeLodEXTFixed(tex, size, R, lod, lodRange[0]);\n}\n\n#define samplerEnv samplerCube\n#define prefilterEnvMap prefilterEnvMapCube\n\n#else\n#ifdef PANORAMA\nvec2 computeUVForMipmap(const in float level, const in vec2 uvBase, const in float size, const in float maxLOD) {\n  vec2 uv = uvBase;\n  float widthForLevel = exp2(maxLOD - level);\n  float heightForLevel = widthForLevel * 0.5;\n  float widthFactor = pow(0.5, level);\n  float heightFactor = widthFactor * 0.5;\n  float texelSize = 1.0 / size;\n\n  uv.y = 1.0 - uv.y;\n\n  float resizeX = (widthForLevel - 2.0) * texelSize;\n  float resizeY = (heightForLevel - 2.0) * texelSize;\n\n  float uvSpaceLocalX = texelSize + uv.x * resizeX;\n  float uvSpaceLocalY = texelSize + uv.y * resizeY;\n\n  uvSpaceLocalY += heightFactor;\n\n  return vec2(uvSpaceLocalX, uvSpaceLocalY);\n}\n\nvec2 normalToPanoramaUVY(const in vec3 dir) {\n  float n = length(dir.xz);\n\n  // to avoid bleeding the max(-1.0,dir.x / n) is needed\n  vec2 pos = vec2((n > 0.0000001) ? max(-1.0, dir.x / n) : 0.0, dir.y);\n\n  // fix edge bleeding\n  if (pos.x > 0.0) pos.x = min(0.999999, pos.x);\n\n  pos = acos(pos) * 0.3183098861837907; // inv_pi\n\n  pos.x = (dir.z > 0.0) ? pos.x * 0.5 : 1.0 - (pos.x * 0.5);\n\n  // shift u to center the panorama to -z\n  pos.x = mod(pos.x - 0.25 + 1.0, 1.0);\n  pos.y = 1.0 - pos.y;\n  return pos;\n}\n\nvec3 texturePanorama(const in sampler2D texture, const in vec2 uv) {\n  vec4 rgba = texture2D(texture, uv);\n#ifdef FLOAT\n  return rgba.rgb;\n#endif\n#ifdef RGBM\n  return RGBMToRGB(rgba);\n#endif\n#ifdef LUV\n  return LUVToRGB(rgba);\n#endif\n}\n\nvec3 texturePanoramaLod(const in sampler2D texture, const in vec2 size, const in vec3 direction, const in float lodInput, const in float maxLOD) {\n  float lod = min(maxLOD, lodInput);\n  vec2 uvBase = normalToPanoramaUVY(direction);\n\n  float lod0 = floor(lod);\n  vec2 uv0 = computeUVForMipmap(lod0, uvBase, size.x, maxLOD);\n  vec3 texel0 = texturePanorama(texture, uv0.xy);\n\n  float lod1 = ceil(lod);\n  vec2 uv1 = computeUVForMipmap(lod1, uvBase, size.x, maxLOD);\n  vec3 texel1 = texturePanorama(texture, uv1.xy);\n\n  return mix(texel0, texel1, fract(lod));\n}\n\nvec3 prefilterEnvMapPanorama(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {\n  float lod = linRoughnessToMipmap(rLinear) * lodRange[1]; //(uEnvironmentMaxLod - 1.0);\n  return texturePanoramaLod(tex, size, R, lod, lodRange[0]);\n}\n\n#define samplerEnv sampler2D\n#define prefilterEnvMap prefilterEnvMapPanorama\n\n#else\n// in case there is no environment node ?\nvec3 prefilterEnvMap(const in float rLinear, const in vec3 R, const in sampler2D tex, const in vec2 lodRange, const in vec2 size) {\n  return vec3(0.0);\n}\n#define samplerEnv sampler2D\n#endif // PANORAMA\n\n#endif // CUBEMAP\n\nvec3 getSpecularDominantDir(const in vec3 N, const in vec3 R, const in float realRoughness) {\n  float smoothness = 1.0 - realRoughness;\n  float lerpFactor = smoothness * (sqrt(smoothness) + realRoughness);\n  // The result is not normalized as we fetch in a cubemap\n  return mix(N, R, lerpFactor);\n}\n\n// samplerEnv and prefilterEnvMap are both defined above (cubemap or panorama)\nvec3 computeIBLSpecularUE4(\n  const in vec3 N,\n  const in vec3 V,\n  const in float rLinear,\n  const in vec3 specular,\n  const in mat3 envTrans,\n  const in samplerEnv texEnv,\n  const in vec2 lodRange,\n  const in vec2 size,\n  const in vec3 frontNormal\n  #ifdef MOBILE\n){\n  #else\n  ,const in sampler2D texBRDF) {\n  #endif\n\n  float rough = max(rLinear, 0.0);\n\n  float NoV = clamp(dot(N, V), 0.0, 1.0);\n  vec3 R = normalize(NoV * 2.0 * N - V);\n\n  R = getSpecularDominantDir(N, R, rLinear);\n  // could use that, especially if NoV comes from shared preCompSpec\n  // vec3 R = reflect(-V, N);\n\n  vec3 dir = envTrans * R;\n  dir.xz *= -1.0;\n\n  vec3 prefilteredColor = prefilterEnvMap(rough, dir, texEnv, lodRange, size);\n  // http://marmosetco.tumblr.com/post/81245981087\n  // TODO we set a min value (10%) to avoid pure blackness (in case of pure metal)\n  float factor = clamp(1.0 + 1.3 * dot(R, frontNormal), 0.1, 1.0);\n  prefilteredColor *= factor * factor;\n  #ifdef MOBILE\n  return prefilteredColor * integrateBRDFApprox(specular, rough, NoV);\n  #else\n  return prefilteredColor * integrateBRDF(specular, rough, NoV, texBRDF);\n  #endif\n}\n\nvec4 linearToGamma(vec4 value, float gammaFactor) {\n  return vec4(pow(value.xyz, vec3(1.0 / gammaFactor)), value.w);\n}\n\nfloat luma(vec3 color) {\n  return dot(color, vec3(0.299, 0.587, 0.114));\n}\n\n\nvoid main() {\n  vec3 eyeVector = normalize(-FragEyeVector.rgb);\n  mat3 transform = environmentTransformPBR(uEnvironmentTransform);\n\n  vec4 frontTangent = gl_FrontFacing ? FragTangent : -FragTangent;\n  vec3 frontNormal = gl_FrontFacing ? FragNormal : -FragNormal;\n\n  vec3 normal = normalize(frontNormal);\n\n  // Normal map\n  #ifdef USE_NORMALMAP\n  vec3 nmTexel = rgbToNormal(textureRGB(sTextureNormalMap, vUv.xy), uFlipY);\n  vec3 normalMap = vec3(uNormalMapFactor * nmTexel.xy, nmTexel.z);\n  vec3 geoNormal = mtexNspaceTangent(frontTangent, normal, normalMap);\n  #else\n  vec3 geoNormal = normal;\n  #endif\n\n  // Secondary normal map\n  #ifdef USE_NORMALMAP2\n  vec3 nm2Texel = rgbToNormal(textureRGB(sTextureNormalMap2, vUv.xy), uFlipY);\n  vec3 normalMap2 = vec3(uNormalMapFactor * nm2Texel.xy, nm2Texel.z);\n  vec3 geoNormal2 = mtexNspaceTangent(frontTangent, normal, normalMap2);\n\n  geoNormal = mix(geoNormal, geoNormal2, 0.5);\n  #endif\n\n  // Metalness / Glossiness\n  vec4 combinedTexel = textureRGBA(sTexturePBRMaps, vUv.xy);\n  float metalness = combinedTexel.r;\n  float glossiness = combinedTexel.a;\n  float channelMetalnessPBR = metalness * uMetalnessPBRFactor;\n  float channelGlossinessPBR = glossiness * uGlossinessPBRFactor;\n  float roughness = 1.0 - channelGlossinessPBR;\n  float tmp_51 = max(1.e-4, roughness);\n  #ifdef USE_NORMALMAP\n    float tmp_52 = adjustRoughnessNormalMap(tmp_51, normalMap);\n    float materialRoughness = adjustRoughnessGeometry(tmp_52, normal);\n  #else\n    float materialRoughness = tmp_51;\n  #endif\n\n  // Albedo\n  vec4 albedoMap = textureRGBA(sTextureAlbedoMap, vUv.xy);\n  #ifndef USE_ALBEDOMAP\n    albedoMap = vec4(uColor, 1.0);\n  #endif\n\n  vec3 channelAlbedoPBR = sRGBToLinear(albedoMap.rgb) * uAlbedoPBRFactor;\n  vec3 materialDiffusePBR = channelAlbedoPBR * (1.0 - channelMetalnessPBR);\n\n  // Ambient occlusion\n  float ao = textureIntensity(sTextureAOMap, vUv.xy);\n  float channelAOPBR = mix(1.0, ao, uAOPBRFactor);\n\n  // Diffuse\n  vec3 diffuse = computeIBLDiffuseUE4(geoNormal, materialDiffusePBR, transform, uDiffuseSPH);\n  // vec3 diffuse = materialDiffusePBR;\n  diffuse *= channelAOPBR;\n\n  // Lightmap\n  #ifdef USE_LIGHTMAP\n    vec4 lightmapTexel = textureRGBA(sTextureLightMap, vUv2);\n    vec3 lightmap = RGBMToRGB(lightmapTexel);\n\n    lightmap = pow(lightmap, vec3(2.2)) * 0.35;\n    diffuse *= lightmap;\n  #endif\n\n  // Specular\n  float materialSpecularf0 = mix(0.0, 0.08, uSpecularF0Factor);\n  vec3 materialSpecularPBR = mix(vec3(materialSpecularf0), channelAlbedoPBR, channelMetalnessPBR);\n  #ifdef CUBEMAP\n  vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sSpecularPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);\n  #else\n  #ifdef PANORAMA\n  vec3 specular = computeIBLSpecularUE4(geoNormal, eyeVector, materialRoughness, materialSpecularPBR, transform, sPanoramaPBR, uTextureEnvironmentSpecularPBRLodRange, uTextureEnvironmentSpecularPBRTextureSize, normal);\n  #endif\n  #endif\n\n  // Specular occlusion\n  specular *= specularOcclusion(uOccludeSpecular, channelAOPBR, geoNormal, eyeVector);\n\n  // Final color\n  vec3 color = diffuse + specular;\n\n  color *= uEnvironmentExposure;\n\n  float channelOpacity = mix(albedoMap.a * uOpacityFactor, 1.0, luma(specular) * 2.0);\n\n  vec3 c = linearTosRGB(color);\n\n  vec3 finalColor = ((c.rgb - 0.5) * max(uContrast, 0.0)) + 0.5;\n\n  gl_FragColor = vec4(finalColor, channelOpacity);\n\n\n  #ifdef ALPHATEST\n    if (gl_FragColor.a < uAlphaTest) discard;\n  #endif\n\n  #ifdef FOG\n    float fogNear = 5.0;\n    float fogFar = 35.0;\n    vec3 fogColor = vec3(0.95, 0.95, 0.95);\n\n    float depth = gl_FragCoord.z / gl_FragCoord.w;\n    float fogFactor = clamp((depth - fogNear) / (fogFar - fogNear), 0.0, 1.0);\n\n    gl_FragColor = mix(gl_FragColor, vec4(fogColor, gl_FragColor.w), fogFactor);\n  #endif\n}",
            "pbr.vs": "attribute vec3 position;\nattribute vec3 normal;\nattribute vec4 tangent;\nattribute vec2 uv;\nattribute vec2 uv2;\n\nuniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\n\nuniform vec4 offsetRepeat;\n\n// varying vec3 FragPosition;\nvarying vec3 FragNormal;\nvarying vec4 FragTangent;\nvarying vec4 FragEyeVector;\nvarying vec2 vUv;\n#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif\n\nvoid main() {\n  vec4 worldPosition = modelMatrix * vec4(position, 1.0);\n\n  FragEyeVector = viewMatrix * worldPosition;\n\n  // FragPosition = worldPosition.xyz;\n\n  gl_Position = projectionMatrix * FragEyeVector;\n\n  vUv = uv.xy * offsetRepeat.zw + offsetRepeat.xy;\n  #ifdef USE_LIGHTMAP\n  vUv2 = uv2.xy;\n  #endif\n\n  FragNormal = normalMatrix * normal;\n\n  FragTangent.xyz = normalMatrix * tangent.xyz;\n  FragTangent.w = tangent.w;\n}",
            "skybox.fs": "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n\nvoid main() {\n  vec3 dir = vWorldPosition;\n  dir.z *= -1.0;\n\n  vec4 texel = textureCube(tCube, dir);\n\n  gl_FragColor = vec4(texel.rgb, 1.0);\n}",
            "skybox.vs": "varying vec3 vWorldPosition;\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n\nvoid main() {\n  vWorldPosition = transformDirection( position, modelMatrix );\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            "spinner.fs": "varying vec2 vUv;\n\nuniform vec3 color;\nuniform float opacity;\nuniform float progress;\n\nvoid main() {\n  vec3 c = color;\n\n  float p = vUv.x;\n\n  float alpha = step(1.0 - progress, 1.0 - vUv.x);\n\n  gl_FragColor = vec4(color, alpha * opacity);\n}",
            "spinner.vs": "varying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}",
            "ui.fs": "#ifdef USE_MAP\n  varying vec2 vUv;\n\n  uniform sampler2D map;\n#endif\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform float alphaThreshold;\nuniform float smoothingOffset;\nuniform bool active;\n\nvoid main() {\n  gl_FragColor = vec4(diffuse, 1.0);\n\n  #ifdef USE_MAP\n    vec4 mapTexel = texture2D(map, vUv);\n\n    if (active) {\n    \tgl_FragColor *= mapTexel;\n\t} else {\t\t\n\t    gl_FragColor.a = mapTexel.r;\n\n\t    gl_FragColor.a *= step(alphaThreshold, mapTexel.b);\n\t    //gl_FragColor.a *= smoothstep(alphaThreshold - smoothingOffset, alphaThreshold + smoothingOffset, mapTexel.b);\n\t}\n\n  gl_FragColor.a *= opacity;\n    \n/* \n   gl_FragColor.rgba = vec4(mapTexel.b); */\n  #endif\n}",
            "ui.vs": "#ifdef USE_MAP\n  varying vec2 vUv;\n  uniform vec4 offsetRepeat;\n#endif\n\nvoid main() {\n  #ifdef USE_MAP\n    vUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n  #endif\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}"
        }
    }
    , {}],
    34: [function(e, t, n) {
        Config = {
            DEFAULTS: {
                levier: "manual",
                siege_avant_droite: "leather"
            },
            ENV: "studio"
        },
        t.exports = Config
    }
    , {}],
    35: [function(e, t, n) {
        var r = (e("11"),
        function(e) {
            this.mesh = e,
            this.tweens = {
                opacity: new TWEEN.Tween
            }
        }
        );
        r.inherit(THREE.Object3D, {
            fadeIn: function(e, t) {
                this.mesh.visible || (this.mesh.visible = !0,
                this.tweens.opacity.reset(this.mesh.material).to({
                    opacity: 1
                }, t).easing(e).start())
            },
            fadeOut: function(e, t) {
                this.mesh.visible && this.tweens.opacity.reset(this.mesh.material).to({
                    opacity: 0
                }, t).easing(e).onComplete(function() {
                    this.mesh.visible = !1
                }
                .bind(this)).start()
            }
        }),
        t.exports = r
    }
    , {
        11: 11
    }],
    36: [function(e, t, n) {
        var r = function() {
            THREE.Mesh.call(this, new THREE.SphereGeometry(.0025,25,25), new THREE.MeshBasicMaterial({
                color: 16777215,
                transparent: !0,
                depthTest: !1
            })),
            this.position.z = -.5,
            this.material.opacity = .15,
            this.renderOrder = 510
        };
        r.inherit(THREE.Mesh),
        t.exports = r
    }
    , {}],
    37: [function(e, t, n) {
        function r(e, t, n) {
            return e + (t - e) * n
        }
        var i = (e("11"),
        e("13"))
          , o = function(e) {
            THREE.Object3D.call(this),
            this.circles = [],
            this.animationDuration = 5,
            this.minCircleScale = 0,
            this.maxCircleScale = 2,
            this.circleOpacity = .7;
            for (var t = 0; t < 3; t++)
                this.addCircle(16777215);
            this.type = "hotspot",
            this.name = e.name,
            this.position.fromArray(e.position),
            this.maxSize = void 0 !== e.maxSize ? e.maxSize : 1,
            this.scale.multiplyScalar(this.maxSize),
            this.fadeDuration = 200
        };
        o.inherit(THREE.Object3D, {
            addCircle: function(e) {
                var t = new THREE.Mesh(new THREE.SphereGeometry(.7,32,32),new THREE.MeshBasicMaterial({
                    transparent: !0,
                    depthTest: !1,
                    color: e
                }));
                this.add(t),
                this.circles.push(t),
                t.opacity = this.circleOpacity,
                t.renderOrder = 150
            },
            initSprites: function() {},
            update: function(e) {
                this.visible && this.updateCircles(e)
            },
            updateCircles: function(e) {
                this.circles.forEach(function(t, n) {
                    var r = e.elapsed + this.animationDuration / this.circles.length * n
                      , i = r / this.animationDuration % 1
                      , o = this.minCircleScale + (this.maxCircleScale - this.minCircleScale) * TWEEN.Easing.Quadratic.Out(i)
                      , a = TWEEN.Easing.Quadratic.In(1 - i);
                    t.scale.set(o, o, o),
                    t.material.opacity = a * t.opacity
                }, this)
            },
            fadeIn: function() {
                this.visible = !0,
                i.tween(this.fadeDuration, TWEEN.Easing.Linear.none).onUpdate(function(e) {
                    this.circles.forEach(function(t) {
                        t.opacity = r(0, this.circleOpacity, e)
                    }, this)
                }
                .bind(this)).onComplete(function() {
                    this.pickable = !0
                }
                .bind(this))
            },
            fadeOut: function() {
                i.tween(this.fadeDuration, TWEEN.Easing.Linear.none).onUpdate(function(e) {
                    this.circles.forEach(function(t) {
                        t.opacity = r(this.circleOpacity, 0, e)
                    }, this)
                }
                .bind(this)).onComplete(function() {
                    this.visible = !1
                }
                .bind(this))
            }
        }),
        t.exports = o
    }
    , {
        11: 11,
        13: 13
    }],
    38: [function(e, t, n) {
        var r = e("11")
          , i = function() {
            var e = new THREE.PlaneGeometry(4,4)
              , t = new THREE.MeshBasicMaterial({
                map: r.getTexture("textures/spacebar.png"),
                transparent: !0
            });
            t.depthTest = !1,
            THREE.Mesh.call(this, e, t),
            this.rotation.z = 2 * Math.PI
        };
        i.inherit(THREE.Mesh),
        t.exports = i
    }
    , {
        11: 11
    }],
    39: [function(e, t, n) {
        !function(e, t) {
            "use strict";
            var n, r, i, o = "._tap", a = "._tapActive", s = "tap", u = "clientX clientY screenX screenY pageX pageY".split(" "), c = {
                count: 0,
                event: 0
            }, l = function(e, n) {
                var r = n.originalEvent
                  , i = t.Event(r);
                i.type = e;
                for (var o = 0, a = u.length; o < a; o++)
                    i[u[o]] = n[u[o]];
                return i
            }, h = function(e) {
                if (e.isTrigger)
                    return !1;
                var n = c.event
                  , r = Math.abs(e.pageX - n.pageX)
                  , i = Math.abs(e.pageY - n.pageY)
                  , o = Math.max(r, i);
                return e.timeStamp - n.timeStamp < t.tap.TIME_DELTA && o < t.tap.POSITION_DELTA && (!n.touches || 1 === c.count) && d.isTracking
            }, f = function(e) {
                if (!i)
                    return !1;
                var n = Math.abs(e.pageX - i.pageX)
                  , r = Math.abs(e.pageY - i.pageY)
                  , o = Math.max(n, r);
                return Math.abs(e.timeStamp - i.timeStamp) < 750 && o < t.tap.POSITION_DELTA
            }, p = function(e) {
                if (0 === e.type.indexOf("touch")) {
                    e.touches = e.originalEvent.changedTouches;
                    for (var t = e.touches[0], n = 0, r = u.length; n < r; n++)
                        e[u[n]] = t[u[n]]
                }
                e.timeStamp = Date.now ? Date.now() : +new Date
            }, d = {
                isEnabled: !1,
                isTracking: !1,
                enable: function() {
                    d.isEnabled || (d.isEnabled = !0,
                    n = t(e.body).on("touchstart" + o, d.onStart).on("mousedown" + o, d.onStart).on("click" + o, d.onClick))
                },
                disable: function() {
                    d.isEnabled && (d.isEnabled = !1,
                    n.off(o))
                },
                onStart: function(e) {
                    e.isTrigger || (p(e),
                    t.tap.LEFT_BUTTON_ONLY && !e.touches && 1 !== e.which || (e.touches && (c.count = e.touches.length),
                    d.isTracking || !e.touches && f(e) || (d.isTracking = !0,
                    c.event = e,
                    e.touches ? (i = e,
                    n.on("touchend" + o + a, d.onEnd).on("touchcancel" + o + a, d.onCancel)) : n.on("mouseup" + o + a, d.onEnd))))
                },
                onEnd: function(e) {
                    var n;
                    e.isTrigger || (p(e),
                    h(e) && (n = l(s, e),
                    r = n,
                    t(c.event.target).trigger(n)),
                    d.onCancel(e))
                },
                onCancel: function(e) {
                    e && "touchcancel" === e.type && e.preventDefault(),
                    d.isTracking = !1,
                    n.off(a)
                },
                onClick: function(e) {
                    if (!e.isTrigger && r && r.isDefaultPrevented() && r.target === e.target && r.pageX === e.pageX && r.pageY === e.pageY && e.timeStamp - r.timeStamp < 750)
                        return r = null,
                        !1
                }
            };
            t(e).ready(d.enable),
            t.tap = {
                POSITION_DELTA: 10,
                TIME_DELTA: 400,
                LEFT_BUTTON_ONLY: !0
            }
        }(document, jQuery)
    }
    , {}],
    40: [function(e, t, n) {
        !function(e, t) {
            e(function() {
                "use strict";
                function e(e, t) {
                    return null != e && null != t && e.toLowerCase() === t.toLowerCase()
                }
                function n(e, t) {
                    var n, r, i = e.length;
                    if (!i || !t)
                        return !1;
                    for (n = t.toLowerCase(),
                    r = 0; i > r; ++r)
                        if (n === e[r].toLowerCase())
                            return !0;
                    return !1
                }
                function r(e) {
                    for (var t in e)
                        s.call(e, t) && (e[t] = new RegExp(e[t],"i"))
                }
                function i(e, t) {
                    this.ua = e || "",
                    this._cache = {},
                    this.maxPhoneWidth = t || 600
                }
                var o = {};
                o.mobileDetectRules = {
                    phones: {
                        iPhone: "\\biPhone\\b|\\biPod\\b",
                        BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
                        HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",
                        Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                        Dell: "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                        Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",
                        Samsung: "Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F",
                        LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)",
                        Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                        Asus: "Asus.*Galaxy|PadFone.*Mobile",
                        NokiaLumia: "Lumia [0-9]{3,4}",
                        Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                        Palm: "PalmSource|Palm",
                        Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                        Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                        Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                        Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                        iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                        SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                        Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                        Alcatel: "Alcatel",
                        Nintendo: "Nintendo 3DS",
                        Amoi: "Amoi",
                        INQ: "INQ",
                        GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
                    },
                    tablets: {
                        iPad: "iPad|iPad.*Mobile",
                        NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
                        SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561",
                        Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI)\\b",
                        SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                        HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                        AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA",
                        BlackBerryTablet: "PlayBook|RIM Tablet",
                        HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                        MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                        NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                        AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20",
                        ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                        LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                        FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                        PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                        LenovoTablet: "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",
                        DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                        YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                        MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                        ArnovaTablet: "AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                        IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                        IRUTablet: "M702pro",
                        MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                        EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                        AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                        ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                        AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                        NokiaLumiaTablet: "Lumia 2520",
                        SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
                        PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                        CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                        CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                        MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
                        MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                        SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                        RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                        FlyTablet: "IQ310|Fly Vision",
                        bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",
                        HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",
                        NecTablet: "\\bN-06D|\\bN-08D",
                        PantechTablet: "Pantech.*P4100",
                        BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
                        VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                        ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
                        PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
                        NabiTablet: "Android.*\\bNabi",
                        KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                        DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                        TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                        PlaystationTablet: "Playstation.*(Portable|Vita)",
                        TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                        PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                        AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                        DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                        GalapadTablet: "Android.*\\bG1\\b",
                        MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                        KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                        AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                        PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                        YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                        ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                        GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
                        PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                        OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",
                        HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                        DPSTablet: "DPS Dream 9|DPS Dual 7",
                        VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                        CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                        MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
                        ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
                        GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                        ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                        VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                        ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
                        StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                        VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497",
                        EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                        RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                        iMobileTablet: "i-mobile i-note",
                        TolinoTablet: "tolino tab [0-9.]+|tolino shine",
                        AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                        AMPETablet: "Android.* A78 ",
                        SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                        TecnoTablet: "TECNO P9",
                        JXDTablet: "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                        iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                        FX2Tablet: "FX2 PAD7|FX2 PAD10",
                        XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                        ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                        OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                        CaptivaTablet: "CAPTIVA PAD",
                        IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                        TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                        OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
                        JaytechTablet: "TPC-PA762",
                        BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
                        DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                        EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                        LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                        AocTablet: "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
                        MpmanTablet: "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
                        CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                        WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                        MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                        NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
                        NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                        LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                        UbislateTablet: "UbiSlate[\\s]?7C",
                        PocketBookTablet: "Pocketbook",
                        KocasoTablet: "\\b(TB-1207)\\b",
                        Hudl: "Hudl HT7S3|Hudl 2",
                        TelstraTablet: "T-Hub2",
                        GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b"
                    },
                    oss: {
                        AndroidOS: "Android",
                        BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
                        PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                        SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                        WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
                        WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                        iOS: "\\biPhone.*Mobile|\\biPod|\\biPad",
                        MeeGoOS: "MeeGo",
                        MaemoOS: "Maemo",
                        JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
                        webOS: "webOS|hpwOS",
                        badaOS: "\\bBada\\b",
                        BREWOS: "BREW"
                    },
                    uas: {
                        Vivaldi: "Vivaldi",
                        Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
                        Dolfin: "\\bDolfin\\b",
                        Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
                        Skyfire: "Skyfire",
                        Edge: "Mobile Safari/[.0-9]* Edge",
                        IE: "IEMobile|MSIEMobile",
                        Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile",
                        Bolt: "bolt",
                        TeaShark: "teashark",
                        Blazer: "Blazer",
                        Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                        Tizen: "Tizen",
                        UCBrowser: "UC.*Browser|UCWEB",
                        baiduboxapp: "baiduboxapp",
                        baidubrowser: "baidubrowser",
                        DiigoBrowser: "DiigoBrowser",
                        Puffin: "Puffin",
                        Mercury: "\\bMercury\\b",
                        ObigoBrowser: "Obigo",
                        NetFront: "NF-Browser",
                        GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
                        PaleMoon: "Android.*PaleMoon|Mobile.*PaleMoon"
                    },
                    props: {
                        Mobile: "Mobile/[VER]",
                        Build: "Build/[VER]",
                        Version: "Version/[VER]",
                        VendorID: "VendorID/[VER]",
                        iPad: "iPad.*CPU[a-z ]+[VER]",
                        iPhone: "iPhone.*CPU[a-z ]+[VER]",
                        iPod: "iPod.*CPU[a-z ]+[VER]",
                        Kindle: "Kindle/[VER]",
                        Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
                        Coast: ["Coast/[VER]"],
                        Dolfin: "Dolfin/[VER]",
                        Firefox: "Firefox/[VER]",
                        Fennec: "Fennec/[VER]",
                        Edge: "Edge/[VER]",
                        IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"],
                        NetFront: "NetFront/[VER]",
                        NokiaBrowser: "NokiaBrowser/[VER]",
                        Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
                        "Opera Mini": "Opera Mini/[VER]",
                        "Opera Mobi": "Version/[VER]",
                        "UC Browser": "UC Browser[VER]",
                        MQQBrowser: "MQQBrowser/[VER]",
                        MicroMessenger: "MicroMessenger/[VER]",
                        baiduboxapp: "baiduboxapp/[VER]",
                        baidubrowser: "baidubrowser/[VER]",
                        Iron: "Iron/[VER]",
                        Safari: ["Version/[VER]", "Safari/[VER]"],
                        Skyfire: "Skyfire/[VER]",
                        Tizen: "Tizen/[VER]",
                        Webkit: "webkit[ /][VER]",
                        PaleMoon: "PaleMoon/[VER]",
                        Gecko: "Gecko/[VER]",
                        Trident: "Trident/[VER]",
                        Presto: "Presto/[VER]",
                        Goanna: "Goanna/[VER]",
                        iOS: " \\bi?OS\\b [VER][ ;]{1}",
                        Android: "Android [VER]",
                        BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"],
                        BREW: "BREW [VER]",
                        Java: "Java/[VER]",
                        "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
                        "Windows Phone": "Windows Phone [VER]",
                        "Windows CE": "Windows CE/[VER]",
                        "Windows NT": "Windows NT [VER]",
                        Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
                        webOS: ["webOS/[VER]", "hpwOS/[VER];"]
                    },
                    utils: {
                        Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
                        MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
                        DesktopMode: "WPDesktop",
                        TV: "SonyDTV|HbbTV",
                        WebKit: "(webkit)[ /]([\\w.]+)",
                        Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
                        Watch: "SM-V700"
                    }
                },
                o.detectMobileBrowsers = {
                    fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                    shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                    tabletPattern: /android|ipad|playbook|silk/i
                };
                var a, s = Object.prototype.hasOwnProperty;
                return o.FALLBACK_PHONE = "UnknownPhone",
                o.FALLBACK_TABLET = "UnknownTablet",
                o.FALLBACK_MOBILE = "UnknownMobile",
                a = "isArray"in Array ? Array.isArray : function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                ,
                function() {
                    var e, t, n, i, u, c, l = o.mobileDetectRules;
                    for (e in l.props)
                        if (s.call(l.props, e)) {
                            for (t = l.props[e],
                            a(t) || (t = [t]),
                            u = t.length,
                            i = 0; u > i; ++i)
                                n = t[i],
                                c = n.indexOf("[VER]"),
                                c >= 0 && (n = n.substring(0, c) + "([\\w._\\+]+)" + n.substring(c + 5)),
                                t[i] = new RegExp(n,"i");
                            l.props[e] = t
                        }
                    r(l.oss),
                    r(l.phones),
                    r(l.tablets),
                    r(l.uas),
                    r(l.utils),
                    l.oss0 = {
                        WindowsPhoneOS: l.oss.WindowsPhoneOS,
                        WindowsMobileOS: l.oss.WindowsMobileOS
                    }
                }(),
                o.findMatch = function(e, t) {
                    for (var n in e)
                        if (s.call(e, n) && e[n].test(t))
                            return n;
                    return null
                }
                ,
                o.findMatches = function(e, t) {
                    var n = [];
                    for (var r in e)
                        s.call(e, r) && e[r].test(t) && n.push(r);
                    return n
                }
                ,
                o.getVersionStr = function(e, t) {
                    var n, r, i, a, u = o.mobileDetectRules.props;
                    if (s.call(u, e))
                        for (n = u[e],
                        i = n.length,
                        r = 0; i > r; ++r)
                            if (a = n[r].exec(t),
                            null !== a)
                                return a[1];
                    return null
                }
                ,
                o.getVersion = function(e, t) {
                    var n = o.getVersionStr(e, t);
                    return n ? o.prepareVersionNo(n) : NaN
                }
                ,
                o.prepareVersionNo = function(e) {
                    var t;
                    return t = e.split(/[a-z._ \/\-]/i),
                    1 === t.length && (e = t[0]),
                    t.length > 1 && (e = t[0] + ".",
                    t.shift(),
                    e += t.join("")),
                    Number(e)
                }
                ,
                o.isMobileFallback = function(e) {
                    return o.detectMobileBrowsers.fullPattern.test(e) || o.detectMobileBrowsers.shortPattern.test(e.substr(0, 4))
                }
                ,
                o.isTabletFallback = function(e) {
                    return o.detectMobileBrowsers.tabletPattern.test(e)
                }
                ,
                o.prepareDetectionCache = function(e, n, r) {
                    if (e.mobile === t) {
                        var a, s, u;
                        return (s = o.findMatch(o.mobileDetectRules.tablets, n)) ? (e.mobile = e.tablet = s,
                        void (e.phone = null)) : (a = o.findMatch(o.mobileDetectRules.phones, n)) ? (e.mobile = e.phone = a,
                        void (e.tablet = null)) : void (o.isMobileFallback(n) ? (u = i.isPhoneSized(r),
                        u === t ? (e.mobile = o.FALLBACK_MOBILE,
                        e.tablet = e.phone = null) : u ? (e.mobile = e.phone = o.FALLBACK_PHONE,
                        e.tablet = null) : (e.mobile = e.tablet = o.FALLBACK_TABLET,
                        e.phone = null)) : o.isTabletFallback(n) ? (e.mobile = e.tablet = o.FALLBACK_TABLET,
                        e.phone = null) : e.mobile = e.tablet = e.phone = null)
                    }
                }
                ,
                o.mobileGrade = function(e) {
                    var t = null !== e.mobile();
                    return e.os("iOS") && e.version("iPad") >= 4.3 || e.os("iOS") && e.version("iPhone") >= 3.1 || e.os("iOS") && e.version("iPod") >= 3.1 || e.version("Android") > 2.1 && e.is("Webkit") || e.version("Windows Phone OS") >= 7 || e.is("BlackBerry") && e.version("BlackBerry") >= 6 || e.match("Playbook.*Tablet") || e.version("webOS") >= 1.4 && e.match("Palm|Pre|Pixi") || e.match("hp.*TouchPad") || e.is("Firefox") && e.version("Firefox") >= 12 || e.is("Chrome") && e.is("AndroidOS") && e.version("Android") >= 4 || e.is("Skyfire") && e.version("Skyfire") >= 4.1 && e.is("AndroidOS") && e.version("Android") >= 2.3 || e.is("Opera") && e.version("Opera Mobi") > 11 && e.is("AndroidOS") || e.is("MeeGoOS") || e.is("Tizen") || e.is("Dolfin") && e.version("Bada") >= 2 || (e.is("UC Browser") || e.is("Dolfin")) && e.version("Android") >= 2.3 || e.match("Kindle Fire") || e.is("Kindle") && e.version("Kindle") >= 3 || e.is("AndroidOS") && e.is("NookTablet") || e.version("Chrome") >= 11 && !t || e.version("Safari") >= 5 && !t || e.version("Firefox") >= 4 && !t || e.version("MSIE") >= 7 && !t || e.version("Opera") >= 10 && !t ? "A" : e.os("iOS") && e.version("iPad") < 4.3 || e.os("iOS") && e.version("iPhone") < 3.1 || e.os("iOS") && e.version("iPod") < 3.1 || e.is("Blackberry") && e.version("BlackBerry") >= 5 && e.version("BlackBerry") < 6 || e.version("Opera Mini") >= 5 && e.version("Opera Mini") <= 6.5 && (e.version("Android") >= 2.3 || e.is("iOS")) || e.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || e.version("Opera Mobi") >= 11 && e.is("SymbianOS") ? "B" : (e.version("BlackBerry") < 5 || e.match("MSIEMobile|Windows CE.*Mobile") || e.version("Windows Mobile") <= 5.2,
                    "C")
                }
                ,
                o.detectOS = function(e) {
                    return o.findMatch(o.mobileDetectRules.oss0, e) || o.findMatch(o.mobileDetectRules.oss, e)
                }
                ,
                o.getDeviceSmallerSide = function() {
                    return window.screen.width < window.screen.height ? window.screen.width : window.screen.height
                }
                ,
                i.prototype = {
                    constructor: i,
                    mobile: function() {
                        return o.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
                        this._cache.mobile
                    },
                    phone: function() {
                        return o.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
                        this._cache.phone
                    },
                    tablet: function() {
                        return o.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth),
                        this._cache.tablet
                    },
                    userAgent: function() {
                        return this._cache.userAgent === t && (this._cache.userAgent = o.findMatch(o.mobileDetectRules.uas, this.ua)),
                        this._cache.userAgent
                    },
                    userAgents: function() {
                        return this._cache.userAgents === t && (this._cache.userAgents = o.findMatches(o.mobileDetectRules.uas, this.ua)),
                        this._cache.userAgents
                    },
                    os: function() {
                        return this._cache.os === t && (this._cache.os = o.detectOS(this.ua)),
                        this._cache.os
                    },
                    version: function(e) {
                        return o.getVersion(e, this.ua)
                    },
                    versionStr: function(e) {
                        return o.getVersionStr(e, this.ua)
                    },
                    is: function(t) {
                        return n(this.userAgents(), t) || e(t, this.os()) || e(t, this.phone()) || e(t, this.tablet()) || n(o.findMatches(o.mobileDetectRules.utils, this.ua), t)
                    },
                    match: function(e) {
                        return e instanceof RegExp || (e = new RegExp(e,"i")),
                        e.test(this.ua)
                    },
                    isPhoneSized: function(e) {
                        return i.isPhoneSized(e || this.maxPhoneWidth)
                    },
                    mobileGrade: function() {
                        return this._cache.grade === t && (this._cache.grade = o.mobileGrade(this)),
                        this._cache.grade
                    }
                },
                "undefined" != typeof window && window.screen ? i.isPhoneSized = function(e) {
                    return 0 > e ? t : o.getDeviceSmallerSide() <= e
                }
                : i.isPhoneSized = function() {}
                ,
                i._impl = o,
                i.version = "1.3.3 2016-07-31",
                i
            })
        }(function(e) {
            if ("undefined" != typeof t && t.exports)
                return function(e) {
                    t.exports = e()
                }
                ;
            if ("function" == typeof define && define.amd)
                return define;
            if ("undefined" != typeof window)
                return function(e) {
                    window.MobileDetect = e()
                }
                ;
            throw new Error("unknown environment")
        }())
    }
    , {}],
    41: [function(e, t, n) {
        window.createjs = window.createjs || {},
        function() {
            var e = createjs.SoundJS = createjs.SoundJS || {};
            e.version = "0.6.1",
            e.buildDate = "Thu, 21 May 2015 16:17:37 GMT"
        }(),
        window.createjs = window.createjs || {},
        createjs.extend = function(e, t) {
            "use strict";
            function n() {
                this.constructor = e
            }
            return n.prototype = t.prototype,
            e.prototype = new n
        }
        ,
        window.createjs = window.createjs || {},
        createjs.promote = function(e, t) {
            "use strict";
            var n = e.prototype
              , r = Object.getPrototypeOf && Object.getPrototypeOf(n) || n.__proto__;
            if (r) {
                n[(t += "_") + "constructor"] = r.constructor;
                for (var i in r)
                    n.hasOwnProperty(i) && "function" == typeof r[i] && (n[t + i] = r[i])
            }
            return e
        }
        ,
        window.createjs = window.createjs || {},
        createjs.indexOf = function(e, t) {
            "use strict";
            for (var n = 0, r = e.length; r > n; n++)
                if (t === e[n])
                    return n;
            return -1
        }
        ,
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            createjs.proxy = function(e, t) {
                var n = Array.prototype.slice.call(arguments, 2);
                return function() {
                    return e.apply(t, Array.prototype.slice.call(arguments, 0).concat(n))
                }
            }
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e() {
                throw "BrowserDetect cannot be instantiated"
            }
            var t = e.agent = window.navigator.userAgent;
            e.isWindowPhone = t.indexOf("IEMobile") > -1 || t.indexOf("Windows Phone") > -1,
            e.isFirefox = t.indexOf("Firefox") > -1,
            e.isOpera = null != window.opera,
            e.isChrome = t.indexOf("Chrome") > -1,
            e.isIOS = (t.indexOf("iPod") > -1 || t.indexOf("iPhone") > -1 || t.indexOf("iPad") > -1) && !e.isWindowPhone,
            e.isAndroid = t.indexOf("Android") > -1 && !e.isWindowPhone,
            e.isBlackberry = t.indexOf("Blackberry") > -1,
            createjs.BrowserDetect = e
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e() {
                this._listeners = null,
                this._captureListeners = null
            }
            var t = e.prototype;
            e.initialize = function(e) {
                e.addEventListener = t.addEventListener,
                e.on = t.on,
                e.removeEventListener = e.off = t.removeEventListener,
                e.removeAllEventListeners = t.removeAllEventListeners,
                e.hasEventListener = t.hasEventListener,
                e.dispatchEvent = t.dispatchEvent,
                e._dispatchEvent = t._dispatchEvent,
                e.willTrigger = t.willTrigger
            }
            ,
            t.addEventListener = function(e, t, n) {
                var r;
                r = n ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
                var i = r[e];
                return i && this.removeEventListener(e, t, n),
                i = r[e],
                i ? i.push(t) : r[e] = [t],
                t
            }
            ,
            t.on = function(e, t, n, r, i, o) {
                return t.handleEvent && (n = n || t,
                t = t.handleEvent),
                n = n || this,
                this.addEventListener(e, function(e) {
                    t.call(n, e, i),
                    r && e.remove()
                }, o)
            }
            ,
            t.removeEventListener = function(e, t, n) {
                var r = n ? this._captureListeners : this._listeners;
                if (r) {
                    var i = r[e];
                    if (i)
                        for (var o = 0, a = i.length; a > o; o++)
                            if (i[o] == t) {
                                1 == a ? delete r[e] : i.splice(o, 1);
                                break
                            }
                }
            }
            ,
            t.off = t.removeEventListener,
            t.removeAllEventListeners = function(e) {
                e ? (this._listeners && delete this._listeners[e],
                this._captureListeners && delete this._captureListeners[e]) : this._listeners = this._captureListeners = null
            }
            ,
            t.dispatchEvent = function(e) {
                if ("string" == typeof e) {
                    var t = this._listeners;
                    if (!t || !t[e])
                        return !1;
                    e = new createjs.Event(e)
                } else
                    e.target && e.clone && (e = e.clone());
                try {
                    e.target = this
                } catch (n) {}
                if (e.bubbles && this.parent) {
                    for (var r = this, i = [r]; r.parent; )
                        i.push(r = r.parent);
                    var o, a = i.length;
                    for (o = a - 1; o >= 0 && !e.propagationStopped; o--)
                        i[o]._dispatchEvent(e, 1 + (0 == o));
                    for (o = 1; a > o && !e.propagationStopped; o++)
                        i[o]._dispatchEvent(e, 3)
                } else
                    this._dispatchEvent(e, 2);
                return e.defaultPrevented
            }
            ,
            t.hasEventListener = function(e) {
                var t = this._listeners
                  , n = this._captureListeners;
                return !!(t && t[e] || n && n[e])
            }
            ,
            t.willTrigger = function(e) {
                for (var t = this; t; ) {
                    if (t.hasEventListener(e))
                        return !0;
                    t = t.parent
                }
                return !1
            }
            ,
            t.toString = function() {
                return "[EventDispatcher]"
            }
            ,
            t._dispatchEvent = function(e, t) {
                var n, r = 1 == t ? this._captureListeners : this._listeners;
                if (e && r) {
                    var i = r[e.type];
                    if (!i || !(n = i.length))
                        return;
                    try {
                        e.currentTarget = this
                    } catch (o) {}
                    try {
                        e.eventPhase = t
                    } catch (o) {}
                    e.removed = !1,
                    i = i.slice();
                    for (var a = 0; n > a && !e.immediatePropagationStopped; a++) {
                        var s = i[a];
                        s.handleEvent ? s.handleEvent(e) : s(e),
                        e.removed && (this.off(e.type, s, 1 == t),
                        e.removed = !1)
                    }
                }
            }
            ,
            createjs.EventDispatcher = e
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, n) {
                this.type = e,
                this.target = null,
                this.currentTarget = null,
                this.eventPhase = 0,
                this.bubbles = !!t,
                this.cancelable = !!n,
                this.timeStamp = (new Date).getTime(),
                this.defaultPrevented = !1,
                this.propagationStopped = !1,
                this.immediatePropagationStopped = !1,
                this.removed = !1
            }
            var t = e.prototype;
            t.preventDefault = function() {
                this.defaultPrevented = this.cancelable && !0
            }
            ,
            t.stopPropagation = function() {
                this.propagationStopped = !0
            }
            ,
            t.stopImmediatePropagation = function() {
                this.immediatePropagationStopped = this.propagationStopped = !0
            }
            ,
            t.remove = function() {
                this.removed = !0
            }
            ,
            t.clone = function() {
                return new e(this.type,this.bubbles,this.cancelable)
            }
            ,
            t.set = function(e) {
                for (var t in e)
                    this[t] = e[t];
                return this
            }
            ,
            t.toString = function() {
                return "[Event (type=" + this.type + ")]"
            }
            ,
            createjs.Event = e
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, n) {
                this.Event_constructor("error"),
                this.title = e,
                this.message = t,
                this.data = n
            }
            var t = createjs.extend(e, createjs.Event);
            t.clone = function() {
                return new createjs.ErrorEvent(this.title,this.message,this.data)
            }
            ,
            createjs.ErrorEvent = createjs.promote(e, "Event")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t) {
                this.Event_constructor("progress"),
                this.loaded = e,
                this.total = null == t ? 1 : t,
                this.progress = 0 == t ? 0 : this.loaded / this.total
            }
            var t = createjs.extend(e, createjs.Event);
            t.clone = function() {
                return new createjs.ProgressEvent(this.loaded,this.total)
            }
            ,
            createjs.ProgressEvent = createjs.promote(e, "Event")
        }(window),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e() {
                this.src = null,
                this.type = null,
                this.id = null,
                this.maintainOrder = !1,
                this.callback = null,
                this.data = null,
                this.method = createjs.LoadItem.GET,
                this.values = null,
                this.headers = null,
                this.withCredentials = !1,
                this.mimeType = null,
                this.crossOrigin = null,
                this.loadTimeout = n.LOAD_TIMEOUT_DEFAULT
            }
            var t = e.prototype = {}
              , n = e;
            n.LOAD_TIMEOUT_DEFAULT = 8e3,
            n.create = function(t) {
                if ("string" == typeof t) {
                    var r = new e;
                    return r.src = t,
                    r
                }
                if (t instanceof n)
                    return t;
                if (t instanceof Object && t.src)
                    return null == t.loadTimeout && (t.loadTimeout = n.LOAD_TIMEOUT_DEFAULT),
                    t;
                throw new Error("Type not recognized.")
            }
            ,
            t.set = function(e) {
                for (var t in e)
                    this[t] = e[t];
                return this
            }
            ,
            createjs.LoadItem = n
        }(),
        function() {
            var e = {};
            e.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i,
            e.RELATIVE_PATT = /^[.\/]*?\//i,
            e.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i,
            e.parseURI = function(t) {
                var n = {
                    absolute: !1,
                    relative: !1
                };
                if (null == t)
                    return n;
                var r = t.indexOf("?");
                r > -1 && (t = t.substr(0, r));
                var i;
                return e.ABSOLUTE_PATT.test(t) ? n.absolute = !0 : e.RELATIVE_PATT.test(t) && (n.relative = !0),
                (i = t.match(e.EXTENSION_PATT)) && (n.extension = i[1].toLowerCase()),
                n
            }
            ,
            e.formatQueryString = function(e, t) {
                if (null == e)
                    throw new Error("You must specify data.");
                var n = [];
                for (var r in e)
                    n.push(r + "=" + escape(e[r]));
                return t && (n = n.concat(t)),
                n.join("&")
            }
            ,
            e.buildPath = function(e, t) {
                if (null == t)
                    return e;
                var n = []
                  , r = e.indexOf("?");
                if (-1 != r) {
                    var i = e.slice(r + 1);
                    n = n.concat(i.split("&"))
                }
                return -1 != r ? e.slice(0, r) + "?" + this._formatQueryString(t, n) : e + "?" + this._formatQueryString(t, n)
            }
            ,
            e.isCrossDomain = function(e) {
                var t = document.createElement("a");
                t.href = e.src;
                var n = document.createElement("a");
                n.href = location.href;
                var r = "" != t.hostname && (t.port != n.port || t.protocol != n.protocol || t.hostname != n.hostname);
                return r
            }
            ,
            e.isLocal = function(e) {
                var t = document.createElement("a");
                return t.href = e.src,
                "" == t.hostname && "file:" == t.protocol
            }
            ,
            e.isBinary = function(e) {
                switch (e) {
                case createjs.AbstractLoader.IMAGE:
                case createjs.AbstractLoader.BINARY:
                    return !0;
                default:
                    return !1
                }
            }
            ,
            e.isImageTag = function(e) {
                return e instanceof HTMLImageElement
            }
            ,
            e.isAudioTag = function(e) {
                return !!window.HTMLAudioElement && e instanceof HTMLAudioElement
            }
            ,
            e.isVideoTag = function(e) {
                return !!window.HTMLVideoElement && e instanceof HTMLVideoElement
            }
            ,
            e.isText = function(e) {
                switch (e) {
                case createjs.AbstractLoader.TEXT:
                case createjs.AbstractLoader.JSON:
                case createjs.AbstractLoader.MANIFEST:
                case createjs.AbstractLoader.XML:
                case createjs.AbstractLoader.CSS:
                case createjs.AbstractLoader.SVG:
                case createjs.AbstractLoader.JAVASCRIPT:
                case createjs.AbstractLoader.SPRITESHEET:
                    return !0;
                default:
                    return !1
                }
            }
            ,
            e.getTypeByExtension = function(e) {
                if (null == e)
                    return createjs.AbstractLoader.TEXT;
                switch (e.toLowerCase()) {
                case "jpeg":
                case "jpg":
                case "gif":
                case "png":
                case "webp":
                case "bmp":
                    return createjs.AbstractLoader.IMAGE;
                case "ogg":
                case "mp3":
                case "webm":
                    return createjs.AbstractLoader.SOUND;
                case "mp4":
                case "webm":
                case "ts":
                    return createjs.AbstractLoader.VIDEO;
                case "json":
                    return createjs.AbstractLoader.JSON;
                case "xml":
                    return createjs.AbstractLoader.XML;
                case "css":
                    return createjs.AbstractLoader.CSS;
                case "js":
                    return createjs.AbstractLoader.JAVASCRIPT;
                case "svg":
                    return createjs.AbstractLoader.SVG;
                default:
                    return createjs.AbstractLoader.TEXT
                }
            }
            ,
            createjs.RequestUtils = e
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, n) {
                this.EventDispatcher_constructor(),
                this.loaded = !1,
                this.canceled = !1,
                this.progress = 0,
                this.type = n,
                this.resultFormatter = null,
                this._item = e ? createjs.LoadItem.create(e) : null,
                this._preferXHR = t,
                this._result = null,
                this._rawResult = null,
                this._loadedItems = null,
                this._tagSrcAttribute = null,
                this._tag = null
            }
            var t = createjs.extend(e, createjs.EventDispatcher)
              , n = e;
            n.POST = "POST",
            n.GET = "GET",
            n.BINARY = "binary",
            n.CSS = "css",
            n.IMAGE = "image",
            n.JAVASCRIPT = "javascript",
            n.JSON = "json",
            n.JSONP = "jsonp",
            n.MANIFEST = "manifest",
            n.SOUND = "sound",
            n.VIDEO = "video",
            n.SPRITESHEET = "spritesheet",
            n.SVG = "svg",
            n.TEXT = "text",
            n.XML = "xml",
            t.getItem = function() {
                return this._item
            }
            ,
            t.getResult = function(e) {
                return e ? this._rawResult : this._result
            }
            ,
            t.getTag = function() {
                return this._tag
            }
            ,
            t.setTag = function(e) {
                this._tag = e
            }
            ,
            t.load = function() {
                this._createRequest(),
                this._request.on("complete", this, this),
                this._request.on("progress", this, this),
                this._request.on("loadStart", this, this),
                this._request.on("abort", this, this),
                this._request.on("timeout", this, this),
                this._request.on("error", this, this);
                var e = new createjs.Event("initialize");
                e.loader = this._request,
                this.dispatchEvent(e),
                this._request.load()
            }
            ,
            t.cancel = function() {
                this.canceled = !0,
                this.destroy()
            }
            ,
            t.destroy = function() {
                this._request && (this._request.removeAllEventListeners(),
                this._request.destroy()),
                this._request = null,
                this._item = null,
                this._rawResult = null,
                this._result = null,
                this._loadItems = null,
                this.removeAllEventListeners()
            }
            ,
            t.getLoadedItems = function() {
                return this._loadedItems
            }
            ,
            t._createRequest = function() {
                this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.TagRequest(this._item,this._tag || this._createTag(),this._tagSrcAttribute)
            }
            ,
            t._createTag = function() {
                return null
            }
            ,
            t._sendLoadStart = function() {
                this._isCanceled() || this.dispatchEvent("loadstart")
            }
            ,
            t._sendProgress = function(e) {
                if (!this._isCanceled()) {
                    var t = null;
                    "number" == typeof e ? (this.progress = e,
                    t = new createjs.ProgressEvent(this.progress)) : (t = e,
                    this.progress = e.loaded / e.total,
                    t.progress = this.progress,
                    (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0)),
                    this.hasEventListener("progress") && this.dispatchEvent(t)
                }
            }
            ,
            t._sendComplete = function() {
                if (!this._isCanceled()) {
                    this.loaded = !0;
                    var e = new createjs.Event("complete");
                    e.rawResult = this._rawResult,
                    null != this._result && (e.result = this._result),
                    this.dispatchEvent(e)
                }
            }
            ,
            t._sendError = function(e) {
                !this._isCanceled() && this.hasEventListener("error") && (null == e && (e = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),
                this.dispatchEvent(e))
            }
            ,
            t._isCanceled = function() {
                return !(null != window.createjs && !this.canceled)
            }
            ,
            t.resultFormatter = null,
            t.handleEvent = function(e) {
                switch (e.type) {
                case "complete":
                    this._rawResult = e.target._response;
                    var t = this.resultFormatter && this.resultFormatter(this)
                      , n = this;
                    t instanceof Function ? t(function(e) {
                        n._result = e,
                        n._sendComplete()
                    }) : (this._result = t || this._rawResult,
                    this._sendComplete());
                    break;
                case "progress":
                    this._sendProgress(e);
                    break;
                case "error":
                    this._sendError(e);
                    break;
                case "loadstart":
                    this._sendLoadStart();
                    break;
                case "abort":
                case "timeout":
                    this._isCanceled() || this.dispatchEvent(e.type)
                }
            }
            ,
            t.buildPath = function(e, t) {
                return createjs.RequestUtils.buildPath(e, t)
            }
            ,
            t.toString = function() {
                return "[PreloadJS AbstractLoader]"
            }
            ,
            createjs.AbstractLoader = createjs.promote(e, "EventDispatcher")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, n) {
                this.AbstractLoader_constructor(e, t, n),
                this.resultFormatter = this._formatResult,
                this._tagSrcAttribute = "src"
            }
            var t = createjs.extend(e, createjs.AbstractLoader);
            t.load = function() {
                this._tag || (this._tag = this._createTag(this._item.src)),
                this._tag.preload = "auto",
                this._tag.load(),
                this.AbstractLoader_load()
            }
            ,
            t._createTag = function() {}
            ,
            t._createRequest = function() {
                this._request = this._preferXHR ? new createjs.XHRRequest(this._item) : new createjs.MediaTagRequest(this._item,this._tag || this._createTag(),this._tagSrcAttribute)
            }
            ,
            t._formatResult = function(e) {
                return this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler),
                this._tag.onstalled = null,
                this._preferXHR && (e.getTag().src = e.getResult(!0)),
                e.getTag()
            }
            ,
            createjs.AbstractMediaLoader = createjs.promote(e, "AbstractLoader")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            var e = function(e) {
                this._item = e
            }
              , t = createjs.extend(e, createjs.EventDispatcher);
            t.load = function() {}
            ,
            t.destroy = function() {}
            ,
            t.cancel = function() {}
            ,
            createjs.AbstractRequest = createjs.promote(e, "EventDispatcher")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, n) {
                this.AbstractRequest_constructor(e),
                this._tag = t,
                this._tagSrcAttribute = n,
                this._loadedHandler = createjs.proxy(this._handleTagComplete, this),
                this._addedToDOM = !1,
                this._startTagVisibility = null
            }
            var t = createjs.extend(e, createjs.AbstractRequest);
            t.load = function() {
                this._tag.onload = createjs.proxy(this._handleTagComplete, this),
                this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this),
                this._tag.onerror = createjs.proxy(this._handleError, this);
                var e = new createjs.Event("initialize");
                e.loader = this._tag,
                this.dispatchEvent(e),
                this._hideTag(),
                this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout),
                this._tag[this._tagSrcAttribute] = this._item.src,
                null == this._tag.parentNode && (window.document.body.appendChild(this._tag),
                this._addedToDOM = !0)
            }
            ,
            t.destroy = function() {
                this._clean(),
                this._tag = null,
                this.AbstractRequest_destroy()
            }
            ,
            t._handleReadyStateChange = function() {
                clearTimeout(this._loadTimeout);
                var e = this._tag;
                ("loaded" == e.readyState || "complete" == e.readyState) && this._handleTagComplete()
            }
            ,
            t._handleError = function() {
                this._clean(),
                this.dispatchEvent("error")
            }
            ,
            t._handleTagComplete = function() {
                this._rawResult = this._tag,
                this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult,
                this._clean(),
                this._showTag(),
                this.dispatchEvent("complete")
            }
            ,
            t._handleTimeout = function() {
                this._clean(),
                this.dispatchEvent(new createjs.Event("timeout"))
            }
            ,
            t._clean = function() {
                this._tag.onload = null,
                this._tag.onreadystatechange = null,
                this._tag.onerror = null,
                this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag),
                clearTimeout(this._loadTimeout)
            }
            ,
            t._hideTag = function() {
                this._startTagVisibility = this._tag.style.visibility,
                this._tag.style.visibility = "hidden"
            }
            ,
            t._showTag = function() {
                this._tag.style.visibility = this._startTagVisibility
            }
            ,
            t._handleStalled = function() {}
            ,
            createjs.TagRequest = createjs.promote(e, "AbstractRequest")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, n) {
                this.AbstractRequest_constructor(e),
                this._tag = t,
                this._tagSrcAttribute = n,
                this._loadedHandler = createjs.proxy(this._handleTagComplete, this)
            }
            var t = createjs.extend(e, createjs.TagRequest);
            t.load = function() {
                var e = createjs.proxy(this._handleStalled, this);
                this._stalledCallback = e;
                var t = createjs.proxy(this._handleProgress, this);
                this._handleProgress = t,
                this._tag.addEventListener("stalled", e),
                this._tag.addEventListener("progress", t),
                this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1),
                this.TagRequest_load()
            }
            ,
            t._handleReadyStateChange = function() {
                clearTimeout(this._loadTimeout);
                var e = this._tag;
                ("loaded" == e.readyState || "complete" == e.readyState) && this._handleTagComplete()
            }
            ,
            t._handleStalled = function() {}
            ,
            t._handleProgress = function(e) {
                if (e && !(e.loaded > 0 && 0 == e.total)) {
                    var t = new createjs.ProgressEvent(e.loaded,e.total);
                    this.dispatchEvent(t)
                }
            }
            ,
            t._clean = function() {
                this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler),
                this._tag.removeEventListener("stalled", this._stalledCallback),
                this._tag.removeEventListener("progress", this._progressCallback),
                this.TagRequest__clean()
            }
            ,
            createjs.MediaTagRequest = createjs.promote(e, "TagRequest")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e) {
                this.AbstractRequest_constructor(e),
                this._request = null,
                this._loadTimeout = null,
                this._xhrLevel = 1,
                this._response = null,
                this._rawResponse = null,
                this._canceled = !1,
                this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this),
                this._handleProgressProxy = createjs.proxy(this._handleProgress, this),
                this._handleAbortProxy = createjs.proxy(this._handleAbort, this),
                this._handleErrorProxy = createjs.proxy(this._handleError, this),
                this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this),
                this._handleLoadProxy = createjs.proxy(this._handleLoad, this),
                this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this),
                !this._createXHR(e)
            }
            var t = createjs.extend(e, createjs.AbstractRequest);
            e.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"],
            t.getResult = function(e) {
                return e && this._rawResponse ? this._rawResponse : this._response
            }
            ,
            t.cancel = function() {
                this.canceled = !0,
                this._clean(),
                this._request.abort()
            }
            ,
            t.load = function() {
                if (null == this._request)
                    return void this._handleError();
                this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1),
                this._request.addEventListener("progress", this._handleProgressProxy, !1),
                this._request.addEventListener("abort", this._handleAbortProxy, !1),
                this._request.addEventListener("error", this._handleErrorProxy, !1),
                this._request.addEventListener("timeout", this._handleTimeoutProxy, !1),
                this._request.addEventListener("load", this._handleLoadProxy, !1),
                this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1),
                1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout));
                try {
                    this._item.values && this._item.method != createjs.AbstractLoader.GET ? this._item.method == createjs.AbstractLoader.POST && this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)) : this._request.send()
                } catch (e) {
                    this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,e))
                }
            }
            ,
            t.setResponseType = function(e) {
                this._request.responseType = e
            }
            ,
            t.getAllResponseHeaders = function() {
                return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
            }
            ,
            t.getResponseHeader = function(e) {
                return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(e) : null
            }
            ,
            t._handleProgress = function(e) {
                if (e && !(e.loaded > 0 && 0 == e.total)) {
                    var t = new createjs.ProgressEvent(e.loaded,e.total);
                    this.dispatchEvent(t)
                }
            }
            ,
            t._handleLoadStart = function() {
                clearTimeout(this._loadTimeout),
                this.dispatchEvent("loadstart")
            }
            ,
            t._handleAbort = function(e) {
                this._clean(),
                this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,e))
            }
            ,
            t._handleError = function(e) {
                this._clean(),
                this.dispatchEvent(new createjs.ErrorEvent(e.message));
            }
            ,
            t._handleReadyStateChange = function() {
                4 == this._request.readyState && this._handleLoad()
            }
            ,
            t._handleLoad = function() {
                if (!this.loaded) {
                    this.loaded = !0;
                    var e = this._checkError();
                    if (e)
                        return void this._handleError(e);
                    this._response = this._getResponse(),
                    this._clean(),
                    this.dispatchEvent(new createjs.Event("complete"))
                }
            }
            ,
            t._handleTimeout = function(e) {
                this._clean(),
                this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,e))
            }
            ,
            t._checkError = function() {
                var e = parseInt(this._request.status);
                switch (e) {
                case 404:
                case 0:
                    return new Error(e)
                }
                return null
            }
            ,
            t._getResponse = function() {
                if (null != this._response)
                    return this._response;
                if (null != this._request.response)
                    return this._request.response;
                try {
                    if (null != this._request.responseText)
                        return this._request.responseText
                } catch (e) {}
                try {
                    if (null != this._request.responseXML)
                        return this._request.responseXML
                } catch (e) {}
                return null
            }
            ,
            t._createXHR = function(e) {
                var t = createjs.RequestUtils.isCrossDomain(e)
                  , n = {}
                  , r = null;
                if (window.XMLHttpRequest)
                    r = new XMLHttpRequest,
                    t && void 0 === r.withCredentials && window.XDomainRequest && (r = new XDomainRequest);
                else {
                    for (var i = 0, o = s.ACTIVEX_VERSIONS.length; o > i; i++) {
                        s.ACTIVEX_VERSIONS[i];
                        try {
                            r = new ActiveXObject(axVersions);
                            break
                        } catch (a) {}
                    }
                    if (null == r)
                        return !1
                }
                null == e.mimeType && createjs.RequestUtils.isText(e.type) && (e.mimeType = "text/plain; charset=utf-8"),
                e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType),
                this._xhrLevel = "string" == typeof r.responseType ? 2 : 1;
                var u = null;
                if (u = e.method == createjs.AbstractLoader.GET ? createjs.RequestUtils.buildPath(e.src, e.values) : e.src,
                r.open(e.method || createjs.AbstractLoader.GET, u, !0),
                t && r instanceof XMLHttpRequest && 1 == this._xhrLevel && (n.Origin = location.origin),
                e.values && e.method == createjs.AbstractLoader.POST && (n["Content-Type"] = "application/x-www-form-urlencoded"),
                t || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest"),
                e.headers)
                    for (var c in e.headers)
                        n[c] = e.headers[c];
                for (c in n)
                    r.setRequestHeader(c, n[c]);
                return r instanceof XMLHttpRequest && void 0 !== e.withCredentials && (r.withCredentials = e.withCredentials),
                this._request = r,
                !0
            }
            ,
            t._clean = function() {
                clearTimeout(this._loadTimeout),
                this._request.removeEventListener("loadstart", this._handleLoadStartProxy),
                this._request.removeEventListener("progress", this._handleProgressProxy),
                this._request.removeEventListener("abort", this._handleAbortProxy),
                this._request.removeEventListener("error", this._handleErrorProxy),
                this._request.removeEventListener("timeout", this._handleTimeoutProxy),
                this._request.removeEventListener("load", this._handleLoadProxy),
                this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)
            }
            ,
            t.toString = function() {
                return "[PreloadJS XHRRequest]"
            }
            ,
            createjs.XHRRequest = createjs.promote(e, "AbstractRequest")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t) {
                this.AbstractMediaLoader_constructor(e, t, createjs.AbstractLoader.SOUND),
                createjs.RequestUtils.isAudioTag(e) ? this._tag = e : createjs.RequestUtils.isAudioTag(e.src) ? this._tag = e : createjs.RequestUtils.isAudioTag(e.tag) && (this._tag = createjs.RequestUtils.isAudioTag(e) ? e : e.src),
                null != this._tag && (this._preferXHR = !1)
            }
            var t = createjs.extend(e, createjs.AbstractMediaLoader)
              , n = e;
            n.canLoadItem = function(e) {
                return e.type == createjs.AbstractLoader.SOUND
            }
            ,
            t._createTag = function(e) {
                var t = document.createElement("audio");
                return t.autoplay = !1,
                t.preload = "none",
                t.src = e,
                t
            }
            ,
            createjs.SoundLoader = createjs.promote(e, "AbstractMediaLoader")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            var e = function() {
                this.interrupt = null,
                this.delay = null,
                this.offset = null,
                this.loop = null,
                this.volume = null,
                this.pan = null,
                this.startTime = null,
                this.duration = null
            }
              , t = e.prototype = {}
              , n = e;
            n.create = function(e) {
                if (e instanceof n || e instanceof Object) {
                    var t = new createjs.PlayPropsConfig;
                    return t.set(e),
                    t
                }
                throw new Error("Type not recognized.")
            }
            ,
            t.set = function(e) {
                for (var t in e)
                    this[t] = e[t];
                return this
            }
            ,
            t.toString = function() {
                return "[PlayPropsConfig]"
            }
            ,
            createjs.PlayPropsConfig = n
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e() {
                throw "Sound cannot be instantiated"
            }
            function t(e, t) {
                this.init(e, t)
            }
            var n = e;
            n.INTERRUPT_ANY = "any",
            n.INTERRUPT_EARLY = "early",
            n.INTERRUPT_LATE = "late",
            n.INTERRUPT_NONE = "none",
            n.PLAY_INITED = "playInited",
            n.PLAY_SUCCEEDED = "playSucceeded",
            n.PLAY_INTERRUPTED = "playInterrupted",
            n.PLAY_FINISHED = "playFinished",
            n.PLAY_FAILED = "playFailed",
            n.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"],
            n.EXTENSION_MAP = {
                m4a: "mp4"
            },
            n.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/,
            n.defaultInterruptBehavior = n.INTERRUPT_NONE,
            n.alternateExtensions = [],
            n.activePlugin = null,
            n._masterVolume = 1,
            Object.defineProperty(n, "volume", {
                get: function() {
                    return this._masterVolume
                },
                set: function(e) {
                    if (null == Number(e))
                        return !1;
                    if (e = Math.max(0, Math.min(1, e)),
                    n._masterVolume = e,
                    !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(e))
                        for (var t = this._instances, r = 0, i = t.length; i > r; r++)
                            t[r].setMasterVolume(e)
                }
            }),
            n._masterMute = !1,
            Object.defineProperty(n, "muted", {
                get: function() {
                    return this._masterMute
                },
                set: function(e) {
                    if (null == e)
                        return !1;
                    if (this._masterMute = e,
                    !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(e))
                        for (var t = this._instances, n = 0, r = t.length; r > n; n++)
                            t[n].setMasterMute(e);
                    return !0
                }
            }),
            Object.defineProperty(n, "capabilities", {
                get: function() {
                    return null == n.activePlugin ? null : n.activePlugin._capabilities
                },
                set: function() {
                    return !1
                }
            }),
            n._pluginsRegistered = !1,
            n._lastID = 0,
            n._instances = [],
            n._idHash = {},
            n._preloadHash = {},
            n._defaultPlayPropsHash = {},
            n.addEventListener = null,
            n.removeEventListener = null,
            n.removeAllEventListeners = null,
            n.dispatchEvent = null,
            n.hasEventListener = null,
            n._listeners = null,
            createjs.EventDispatcher.initialize(n),
            n.getPreloadHandlers = function() {
                return {
                    callback: createjs.proxy(n.initLoad, n),
                    types: ["sound"],
                    extensions: n.SUPPORTED_EXTENSIONS
                }
            }
            ,
            n._handleLoadComplete = function(e) {
                var t = e.target.getItem().src;
                if (n._preloadHash[t])
                    for (var r = 0, i = n._preloadHash[t].length; i > r; r++) {
                        var o = n._preloadHash[t][r];
                        if (n._preloadHash[t][r] = !0,
                        n.hasEventListener("fileload")) {
                            var e = new createjs.Event("fileload");
                            e.src = o.src,
                            e.id = o.id,
                            e.data = o.data,
                            e.sprite = o.sprite,
                            n.dispatchEvent(e)
                        }
                    }
            }
            ,
            n._handleLoadError = function(e) {
                var t = e.target.getItem().src;
                if (n._preloadHash[t])
                    for (var r = 0, i = n._preloadHash[t].length; i > r; r++) {
                        var o = n._preloadHash[t][r];
                        if (n._preloadHash[t][r] = !1,
                        n.hasEventListener("fileerror")) {
                            var e = new createjs.Event("fileerror");
                            e.src = o.src,
                            e.id = o.id,
                            e.data = o.data,
                            e.sprite = o.sprite,
                            n.dispatchEvent(e)
                        }
                    }
            }
            ,
            n._registerPlugin = function(e) {
                return !!e.isSupported() && (n.activePlugin = new e,
                !0)
            }
            ,
            n.registerPlugins = function(e) {
                n._pluginsRegistered = !0;
                for (var t = 0, r = e.length; r > t; t++)
                    if (n._registerPlugin(e[t]))
                        return !0;
                return !1
            }
            ,
            n.initializeDefaultPlugins = function() {
                return null != n.activePlugin || !n._pluginsRegistered && !!n.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin])
            }
            ,
            n.isReady = function() {
                return null != n.activePlugin
            }
            ,
            n.getCapabilities = function() {
                return null == n.activePlugin ? null : n.activePlugin._capabilities
            }
            ,
            n.getCapability = function(e) {
                return null == n.activePlugin ? null : n.activePlugin._capabilities[e]
            }
            ,
            n.initLoad = function(e) {
                return n._registerSound(e)
            }
            ,
            n._registerSound = function(e) {
                if (!n.initializeDefaultPlugins())
                    return !1;
                var r;
                if (e.src instanceof Object ? (r = n._parseSrc(e.src),
                r.src = e.path + r.src) : r = n._parsePath(e.src),
                null == r)
                    return !1;
                e.src = r.src,
                e.type = "sound";
                var i = e.data
                  , o = null;
                if (null != i && (isNaN(i.channels) ? isNaN(i) || (o = parseInt(i)) : o = parseInt(i.channels),
                i.audioSprite))
                    for (var a, s = i.audioSprite.length; s--; )
                        a = i.audioSprite[s],
                        n._idHash[a.id] = {
                            src: e.src,
                            startTime: parseInt(a.startTime),
                            duration: parseInt(a.duration)
                        },
                        a.defaultPlayProps && (n._defaultPlayPropsHash[a.id] = createjs.PlayPropsConfig.create(a.defaultPlayProps));
                null != e.id && (n._idHash[e.id] = {
                    src: e.src
                });
                var u = n.activePlugin.register(e);
                return t.create(e.src, o),
                null != i && isNaN(i) ? e.data.channels = o || t.maxPerChannel() : e.data = o || t.maxPerChannel(),
                u.type && (e.type = u.type),
                e.defaultPlayProps && (n._defaultPlayPropsHash[e.src] = createjs.PlayPropsConfig.create(e.defaultPlayProps)),
                u
            }
            ,
            n.registerSound = function(e, t, r, i, o) {
                var a = {
                    src: e,
                    id: t,
                    data: r,
                    defaultPlayProps: o
                };
                e instanceof Object && e.src && (i = t,
                a = e),
                a = createjs.LoadItem.create(a),
                a.path = i,
                null == i || a.src instanceof Object || (a.src = i + e);
                var s = n._registerSound(a);
                if (!s)
                    return !1;
                if (n._preloadHash[a.src] || (n._preloadHash[a.src] = []),
                n._preloadHash[a.src].push(a),
                1 == n._preloadHash[a.src].length)
                    s.on("complete", createjs.proxy(this._handleLoadComplete, this)),
                    s.on("error", createjs.proxy(this._handleLoadError, this)),
                    n.activePlugin.preload(s);
                else if (1 == n._preloadHash[a.src][0])
                    return !0;
                return a
            }
            ,
            n.registerSounds = function(e, t) {
                var n = [];
                e.path && (t ? t += e.path : t = e.path,
                e = e.manifest);
                for (var r = 0, i = e.length; i > r; r++)
                    n[r] = createjs.Sound.registerSound(e[r].src, e[r].id, e[r].data, t, e[r].defaultPlayProps);
                return n
            }
            ,
            n.removeSound = function(e, r) {
                if (null == n.activePlugin)
                    return !1;
                e instanceof Object && e.src && (e = e.src);
                var i;
                if (e instanceof Object ? i = n._parseSrc(e) : (e = n._getSrcById(e).src,
                i = n._parsePath(e)),
                null == i)
                    return !1;
                e = i.src,
                null != r && (e = r + e);
                for (var o in n._idHash)
                    n._idHash[o].src == e && delete n._idHash[o];
                return t.removeSrc(e),
                delete n._preloadHash[e],
                n.activePlugin.removeSound(e),
                !0
            }
            ,
            n.removeSounds = function(e, t) {
                var n = [];
                e.path && (t ? t += e.path : t = e.path,
                e = e.manifest);
                for (var r = 0, i = e.length; i > r; r++)
                    n[r] = createjs.Sound.removeSound(e[r].src, t);
                return n
            }
            ,
            n.removeAllSounds = function() {
                n._idHash = {},
                n._preloadHash = {},
                t.removeAll(),
                n.activePlugin && n.activePlugin.removeAllSounds()
            }
            ,
            n.loadComplete = function(e) {
                if (!n.isReady())
                    return !1;
                var t = n._parsePath(e);
                return e = t ? n._getSrcById(t.src).src : n._getSrcById(e).src,
                void 0 != n._preloadHash[e] && 1 == n._preloadHash[e][0]
            }
            ,
            n._parsePath = function(e) {
                "string" != typeof e && (e = e.toString());
                var t = e.match(n.FILE_PATTERN);
                if (null == t)
                    return !1;
                for (var r = t[4], i = t[5], o = n.capabilities, a = 0; !o[i]; )
                    if (i = n.alternateExtensions[a++],
                    a > n.alternateExtensions.length)
                        return null;
                e = e.replace("." + t[5], "." + i);
                var s = {
                    name: r,
                    src: e,
                    extension: i
                };
                return s
            }
            ,
            n._parseSrc = function(e) {
                var t = {
                    name: void 0,
                    src: void 0,
                    extension: void 0
                }
                  , r = n.capabilities;
                for (var i in e)
                    if (e.hasOwnProperty(i) && r[i]) {
                        t.src = e[i],
                        t.extension = i;
                        break
                    }
                if (!t.src)
                    return !1;
                var o = t.src.lastIndexOf("/");
                return t.name = -1 != o ? t.src.slice(o + 1) : t.src,
                t
            }
            ,
            n.play = function(e, t, r, i, o, a, s, u, c) {
                var l;
                l = createjs.PlayPropsConfig.create(t instanceof Object || t instanceof createjs.PlayPropsConfig ? t : {
                    interrupt: t,
                    delay: r,
                    offset: i,
                    loop: o,
                    volume: a,
                    pan: s,
                    startTime: u,
                    duration: c
                });
                var h = n.createInstance(e, l.startTime, l.duration)
                  , f = n._playInstance(h, l);
                return f || h._playFailed(),
                h
            }
            ,
            n.createInstance = function(e, r, i) {
                if (!n.initializeDefaultPlugins())
                    return new createjs.DefaultSoundInstance(e,r,i);
                var o = n._defaultPlayPropsHash[e];
                e = n._getSrcById(e);
                var a = n._parsePath(e.src)
                  , s = null;
                return null != a && null != a.src ? (t.create(a.src),
                null == r && (r = e.startTime),
                s = n.activePlugin.create(a.src, r, i || e.duration),
                o = o || n._defaultPlayPropsHash[a.src],
                o && s.applyPlayProps(o)) : s = new createjs.DefaultSoundInstance(e,r,i),
                s.uniqueId = n._lastID++,
                s
            }
            ,
            n.stop = function() {
                for (var e = this._instances, t = e.length; t--; )
                    e[t].stop()
            }
            ,
            n.setVolume = function(e) {
                if (null == Number(e))
                    return !1;
                if (e = Math.max(0, Math.min(1, e)),
                n._masterVolume = e,
                !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(e))
                    for (var t = this._instances, r = 0, i = t.length; i > r; r++)
                        t[r].setMasterVolume(e)
            }
            ,
            n.getVolume = function() {
                return this._masterVolume
            }
            ,
            n.setMute = function(e) {
                if (null == e)
                    return !1;
                if (this._masterMute = e,
                !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(e))
                    for (var t = this._instances, n = 0, r = t.length; r > n; n++)
                        t[n].setMasterMute(e);
                return !0
            }
            ,
            n.getMute = function() {
                return this._masterMute
            }
            ,
            n.setDefaultPlayProps = function(e, t) {
                e = n._getSrcById(e),
                n._defaultPlayPropsHash[n._parsePath(e.src).src] = createjs.PlayPropsConfig.create(t)
            }
            ,
            n.getDefaultPlayProps = function(e) {
                return e = n._getSrcById(e),
                n._defaultPlayPropsHash[n._parsePath(e.src).src]
            }
            ,
            n._playInstance = function(e, t) {
                var r = n._defaultPlayPropsHash[e.src] || {};
                if (null == t.interrupt && (t.interrupt = r.interrupt || n.defaultInterruptBehavior),
                null == t.delay && (t.delay = r.delay || 0),
                null == t.offset && (t.offset = e.getPosition()),
                null == t.loop && (t.loop = e.loop),
                null == t.volume && (t.volume = e.volume),
                null == t.pan && (t.pan = e.pan),
                0 == t.delay) {
                    var i = n._beginPlaying(e, t);
                    if (!i)
                        return !1
                } else {
                    var o = setTimeout(function() {
                        n._beginPlaying(e, t)
                    }, t.delay);
                    e.delayTimeoutId = o
                }
                return this._instances.push(e),
                !0
            }
            ,
            n._beginPlaying = function(e, n) {
                if (!t.add(e, n.interrupt))
                    return !1;
                var r = e._beginPlaying(n);
                if (!r) {
                    var i = createjs.indexOf(this._instances, e);
                    return i > -1 && this._instances.splice(i, 1),
                    !1
                }
                return !0
            }
            ,
            n._getSrcById = function(e) {
                return n._idHash[e] || {
                    src: e
                }
            }
            ,
            n._playFinished = function(e) {
                t.remove(e);
                var n = createjs.indexOf(this._instances, e);
                n > -1 && this._instances.splice(n, 1)
            }
            ,
            createjs.Sound = e,
            t.channels = {},
            t.create = function(e, n) {
                var r = t.get(e);
                return null == r && (t.channels[e] = new t(e,n),
                !0)
            }
            ,
            t.removeSrc = function(e) {
                var n = t.get(e);
                return null != n && (n._removeAll(),
                delete t.channels[e],
                !0)
            }
            ,
            t.removeAll = function() {
                for (var e in t.channels)
                    t.channels[e]._removeAll();
                t.channels = {}
            }
            ,
            t.add = function(e, n) {
                var r = t.get(e.src);
                return null != r && r._add(e, n)
            }
            ,
            t.remove = function(e) {
                var n = t.get(e.src);
                return null != n && (n._remove(e),
                !0)
            }
            ,
            t.maxPerChannel = function() {
                return r.maxDefault
            }
            ,
            t.get = function(e) {
                return t.channels[e]
            }
            ;
            var r = t.prototype;
            r.constructor = t,
            r.src = null,
            r.max = null,
            r.maxDefault = 100,
            r.length = 0,
            r.init = function(e, t) {
                this.src = e,
                this.max = t || this.maxDefault,
                -1 == this.max && (this.max = this.maxDefault),
                this._instances = []
            }
            ,
            r._get = function(e) {
                return this._instances[e]
            }
            ,
            r._add = function(e, t) {
                return !!this._getSlot(t, e) && (this._instances.push(e),
                this.length++,
                !0)
            }
            ,
            r._remove = function(e) {
                var t = createjs.indexOf(this._instances, e);
                return -1 != t && (this._instances.splice(t, 1),
                this.length--,
                !0)
            }
            ,
            r._removeAll = function() {
                for (var e = this.length - 1; e >= 0; e--)
                    this._instances[e].stop()
            }
            ,
            r._getSlot = function(t) {
                var n, r;
                if (t != e.INTERRUPT_NONE && (r = this._get(0),
                null == r))
                    return !0;
                for (var i = 0, o = this.max; o > i; i++) {
                    if (n = this._get(i),
                    null == n)
                        return !0;
                    if (n.playState == e.PLAY_FINISHED || n.playState == e.PLAY_INTERRUPTED || n.playState == e.PLAY_FAILED) {
                        r = n;
                        break
                    }
                    t != e.INTERRUPT_NONE && (t == e.INTERRUPT_EARLY && n.getPosition() < r.getPosition() || t == e.INTERRUPT_LATE && n.getPosition() > r.getPosition()) && (r = n)
                }
                return null != r && (r._interrupt(),
                this._remove(r),
                !0)
            }
            ,
            r.toString = function() {
                return "[Sound SoundChannel]"
            }
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            var e = function(e, t, n, r) {
                this.EventDispatcher_constructor(),
                this.src = e,
                this.uniqueId = -1,
                this.playState = null,
                this.delayTimeoutId = null,
                this._volume = 1,
                Object.defineProperty(this, "volume", {
                    get: this.getVolume,
                    set: this.setVolume
                }),
                this._pan = 0,
                Object.defineProperty(this, "pan", {
                    get: this.getPan,
                    set: this.setPan
                }),
                this._startTime = Math.max(0, t || 0),
                Object.defineProperty(this, "startTime", {
                    get: this.getStartTime,
                    set: this.setStartTime
                }),
                this._duration = Math.max(0, n || 0),
                Object.defineProperty(this, "duration", {
                    get: this.getDuration,
                    set: this.setDuration
                }),
                this._playbackResource = null,
                Object.defineProperty(this, "playbackResource", {
                    get: this.getPlaybackResource,
                    set: this.setPlaybackResource
                }),
                r !== !1 && r !== !0 && this.setPlaybackResource(r),
                this._position = 0,
                Object.defineProperty(this, "position", {
                    get: this.getPosition,
                    set: this.setPosition
                }),
                this._loop = 0,
                Object.defineProperty(this, "loop", {
                    get: this.getLoop,
                    set: this.setLoop
                }),
                this._muted = !1,
                Object.defineProperty(this, "muted", {
                    get: this.getMuted,
                    set: this.setMuted
                }),
                this._paused = !1,
                Object.defineProperty(this, "paused", {
                    get: this.getPaused,
                    set: this.setPaused
                })
            }
              , t = createjs.extend(e, createjs.EventDispatcher);
            t.play = function(e, t, n, r, i, o) {
                var a;
                return a = createjs.PlayPropsConfig.create(e instanceof Object || e instanceof createjs.PlayPropsConfig ? e : {
                    interrupt: e,
                    delay: t,
                    offset: n,
                    loop: r,
                    volume: i,
                    pan: o
                }),
                this.playState == createjs.Sound.PLAY_SUCCEEDED ? (this.applyPlayProps(a),
                void (this._paused && this.setPaused(!1))) : (this._cleanUp(),
                createjs.Sound._playInstance(this, a),
                this)
            }
            ,
            t.stop = function() {
                return this._position = 0,
                this._paused = !1,
                this._handleStop(),
                this._cleanUp(),
                this.playState = createjs.Sound.PLAY_FINISHED,
                this
            }
            ,
            t.destroy = function() {
                this._cleanUp(),
                this.src = null,
                this.playbackResource = null,
                this.removeAllEventListeners()
            }
            ,
            t.applyPlayProps = function(e) {
                return null != e.offset && this.setPosition(e.offset),
                null != e.loop && this.setLoop(e.loop),
                null != e.volume && this.setVolume(e.volume),
                null != e.pan && this.setPan(e.pan),
                null != e.startTime && (this.setStartTime(e.startTime),
                this.setDuration(e.duration)),
                this
            }
            ,
            t.toString = function() {
                return "[AbstractSoundInstance]"
            }
            ,
            t.getPaused = function() {
                return this._paused
            }
            ,
            t.setPaused = function(e) {
                return e !== !0 && e !== !1 || this._paused == e || 1 == e && this.playState != createjs.Sound.PLAY_SUCCEEDED ? void 0 : (this._paused = e,
                e ? this._pause() : this._resume(),
                clearTimeout(this.delayTimeoutId),
                this)
            }
            ,
            t.setVolume = function(e) {
                return e == this._volume ? this : (this._volume = Math.max(0, Math.min(1, e)),
                this._muted || this._updateVolume(),
                this)
            }
            ,
            t.getVolume = function() {
                return this._volume
            }
            ,
            t.setMuted = function(e) {
                return e === !0 || e === !1 ? (this._muted = e,
                this._updateVolume(),
                this) : void 0
            }
            ,
            t.getMuted = function() {
                return this._muted
            }
            ,
            t.setPan = function(e) {
                return e == this._pan ? this : (this._pan = Math.max(-1, Math.min(1, e)),
                this._updatePan(),
                this)
            }
            ,
            t.getPan = function() {
                return this._pan
            }
            ,
            t.getPosition = function() {
                return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || (this._position = this._calculateCurrentPosition()),
                this._position
            }
            ,
            t.setPosition = function(e) {
                return this._position = Math.max(0, e),
                this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(),
                this
            }
            ,
            t.getStartTime = function() {
                return this._startTime
            }
            ,
            t.setStartTime = function(e) {
                return e == this._startTime ? this : (this._startTime = Math.max(0, e || 0),
                this._updateStartTime(),
                this)
            }
            ,
            t.getDuration = function() {
                return this._duration
            }
            ,
            t.setDuration = function(e) {
                return e == this._duration ? this : (this._duration = Math.max(0, e || 0),
                this._updateDuration(),
                this)
            }
            ,
            t.setPlaybackResource = function(e) {
                return this._playbackResource = e,
                0 == this._duration && this._setDurationFromSource(),
                this
            }
            ,
            t.getPlaybackResource = function() {
                return this._playbackResource
            }
            ,
            t.getLoop = function() {
                return this._loop
            }
            ,
            t.setLoop = function(e) {
                null != this._playbackResource && (0 != this._loop && 0 == e ? this._removeLooping(e) : 0 == this._loop && 0 != e && this._addLooping(e)),
                this._loop = e
            }
            ,
            t._sendEvent = function(e) {
                var t = new createjs.Event(e);
                this.dispatchEvent(t)
            }
            ,
            t._cleanUp = function() {
                clearTimeout(this.delayTimeoutId),
                this._handleCleanUp(),
                this._paused = !1,
                createjs.Sound._playFinished(this)
            }
            ,
            t._interrupt = function() {
                this._cleanUp(),
                this.playState = createjs.Sound.PLAY_INTERRUPTED,
                this._sendEvent("interrupted")
            }
            ,
            t._beginPlaying = function(e) {
                return this.setPosition(e.offset),
                this.setLoop(e.loop),
                this.setVolume(e.volume),
                this.setPan(e.pan),
                null != e.startTime && (this.setStartTime(e.startTime),
                this.setDuration(e.duration)),
                null != this._playbackResource && this._position < this._duration ? (this._paused = !1,
                this._handleSoundReady(),
                this.playState = createjs.Sound.PLAY_SUCCEEDED,
                this._sendEvent("succeeded"),
                !0) : (this._playFailed(),
                !1)
            }
            ,
            t._playFailed = function() {
                this._cleanUp(),
                this.playState = createjs.Sound.PLAY_FAILED,
                this._sendEvent("failed")
            }
            ,
            t._handleSoundComplete = function() {
                return this._position = 0,
                0 != this._loop ? (this._loop--,
                this._handleLoop(),
                void this._sendEvent("loop")) : (this._cleanUp(),
                this.playState = createjs.Sound.PLAY_FINISHED,
                void this._sendEvent("complete"))
            }
            ,
            t._handleSoundReady = function() {}
            ,
            t._updateVolume = function() {}
            ,
            t._updatePan = function() {}
            ,
            t._updateStartTime = function() {}
            ,
            t._updateDuration = function() {}
            ,
            t._setDurationFromSource = function() {}
            ,
            t._calculateCurrentPosition = function() {}
            ,
            t._updatePosition = function() {}
            ,
            t._removeLooping = function() {}
            ,
            t._addLooping = function() {}
            ,
            t._pause = function() {}
            ,
            t._resume = function() {}
            ,
            t._handleStop = function() {}
            ,
            t._handleCleanUp = function() {}
            ,
            t._handleLoop = function() {}
            ,
            createjs.AbstractSoundInstance = createjs.promote(e, "EventDispatcher"),
            createjs.DefaultSoundInstance = createjs.AbstractSoundInstance
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            var e = function() {
                this._capabilities = null,
                this._loaders = {},
                this._audioSources = {},
                this._soundInstances = {},
                this._volume = 1,
                this._loaderClass,
                this._soundInstanceClass
            }
              , t = e.prototype;
            e._capabilities = null,
            e.isSupported = function() {
                return !0
            }
            ,
            t.register = function(e) {
                var t = this._loaders[e.src];
                return t && !t.canceled ? this._loaders[e.src] : (this._audioSources[e.src] = !0,
                this._soundInstances[e.src] = [],
                t = new this._loaderClass(e),
                t.on("complete", createjs.proxy(this._handlePreloadComplete, this)),
                this._loaders[e.src] = t,
                t)
            }
            ,
            t.preload = function(e) {
                e.on("error", createjs.proxy(this._handlePreloadError, this)),
                e.load()
            }
            ,
            t.isPreloadStarted = function(e) {
                return null != this._audioSources[e]
            }
            ,
            t.isPreloadComplete = function(e) {
                return !(null == this._audioSources[e] || 1 == this._audioSources[e])
            }
            ,
            t.removeSound = function(e) {
                if (this._soundInstances[e]) {
                    for (var t = this._soundInstances[e].length; t--; ) {
                        var n = this._soundInstances[e][t];
                        n.destroy()
                    }
                    delete this._soundInstances[e],
                    delete this._audioSources[e],
                    this._loaders[e] && this._loaders[e].destroy(),
                    delete this._loaders[e]
                }
            }
            ,
            t.removeAllSounds = function() {
                for (var e in this._audioSources)
                    this.removeSound(e)
            }
            ,
            t.create = function(e, t, n) {
                this.isPreloadStarted(e) || this.preload(this.register(e));
                var r = new this._soundInstanceClass(e,t,n,this._audioSources[e]);
                return this._soundInstances[e].push(r),
                r
            }
            ,
            t.setVolume = function(e) {
                return this._volume = e,
                this._updateVolume(),
                !0
            }
            ,
            t.getVolume = function() {
                return this._volume
            }
            ,
            t.setMute = function() {
                return this._updateVolume(),
                !0
            }
            ,
            t.toString = function() {
                return "[AbstractPlugin]"
            }
            ,
            t._handlePreloadComplete = function(e) {
                var t = e.target.getItem().src;
                this._audioSources[t] = e.result;
                for (var n = 0, r = this._soundInstances[t].length; r > n; n++) {
                    var i = this._soundInstances[t][n];
                    i.setPlaybackResource(this._audioSources[t])
                }
            }
            ,
            t._handlePreloadError = function() {}
            ,
            t._updateVolume = function() {}
            ,
            createjs.AbstractPlugin = e
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e) {
                this.AbstractLoader_constructor(e, !0, createjs.AbstractLoader.SOUND)
            }
            var t = createjs.extend(e, createjs.AbstractLoader);
            e.context = null,
            t.toString = function() {
                return "[WebAudioLoader]"
            }
            ,
            t._createRequest = function() {
                this._request = new createjs.XHRRequest(this._item,(!1)),
                this._request.setResponseType("arraybuffer")
            }
            ,
            t._sendComplete = function() {
                e.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._sendError, this))
            }
            ,
            t._handleAudioDecoded = function(e) {
                this._result = e,
                this.AbstractLoader__sendComplete()
            }
            ,
            createjs.WebAudioLoader = createjs.promote(e, "AbstractLoader")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, r, i) {
                this.AbstractSoundInstance_constructor(e, t, r, i),
                this.gainNode = n.context.createGain(),
                this.panNode = n.context.createPanner(),
                this.panNode.panningModel = n._panningModel,
                this.panNode.connect(this.gainNode),
                this.sourceNode = null,
                this._soundCompleteTimeout = null,
                this._sourceNodeNext = null,
                this._playbackStartTime = 0,
                this._endedHandler = createjs.proxy(this._handleSoundComplete, this)
            }
            var t = createjs.extend(e, createjs.AbstractSoundInstance)
              , n = e;
            n.context = null,
            n.destinationNode = null,
            n._panningModel = "equalpower",
            t.destroy = function() {
                this.AbstractSoundInstance_destroy(),
                this.panNode.disconnect(0),
                this.panNode = null,
                this.gainNode.disconnect(0),
                this.gainNode = null
            }
            ,
            t.toString = function() {
                return "[WebAudioSoundInstance]"
            }
            ,
            t._updatePan = function() {
                this.panNode.setPosition(this._pan, 0, -.5)
            }
            ,
            t._removeLooping = function() {
                this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)
            }
            ,
            t._addLooping = function() {
                this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
            }
            ,
            t._setDurationFromSource = function() {
                this._duration = 1e3 * this.playbackResource.duration
            }
            ,
            t._handleCleanUp = function() {
                this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED && (this.sourceNode = this._cleanUpAudioNode(this.sourceNode),
                this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)),
                0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
                clearTimeout(this._soundCompleteTimeout),
                this._playbackStartTime = 0
            }
            ,
            t._cleanUpAudioNode = function(e) {
                return e && (e.stop(0),
                e.disconnect(0),
                e = null),
                e
            }
            ,
            t._handleSoundReady = function() {
                this.gainNode.connect(n.destinationNode);
                var e = .001 * this._duration
                  , t = .001 * this._position;
                t > e && (t = e),
                this.sourceNode = this._createAndPlayAudioNode(n.context.currentTime - e, t),
                this._playbackStartTime = this.sourceNode.startTime - t,
                this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * (e - t)),
                0 != this._loop && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0))
            }
            ,
            t._createAndPlayAudioNode = function(e, t) {
                var r = n.context.createBufferSource();
                r.buffer = this.playbackResource,
                r.connect(this.panNode);
                var i = .001 * this._duration;
                return r.startTime = e + i,
                r.start(r.startTime, t + .001 * this._startTime, i - t),
                r
            }
            ,
            t._pause = function() {
                this._position = 1e3 * (n.context.currentTime - this._playbackStartTime),
                this.sourceNode = this._cleanUpAudioNode(this.sourceNode),
                this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext),
                0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0),
                clearTimeout(this._soundCompleteTimeout)
            }
            ,
            t._resume = function() {
                this._handleSoundReady()
            }
            ,
            t._updateVolume = function() {
                var e = this._muted ? 0 : this._volume;
                e != this.gainNode.gain.value && (this.gainNode.gain.value = e)
            }
            ,
            t._calculateCurrentPosition = function() {
                return 1e3 * (n.context.currentTime - this._playbackStartTime)
            }
            ,
            t._updatePosition = function() {
                this.sourceNode = this._cleanUpAudioNode(this.sourceNode),
                this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext),
                clearTimeout(this._soundCompleteTimeout),
                this._paused || this._handleSoundReady()
            }
            ,
            t._handleLoop = function() {
                this._cleanUpAudioNode(this.sourceNode),
                this.sourceNode = this._sourceNodeNext,
                this._playbackStartTime = this.sourceNode.startTime,
                this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0),
                this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration)
            }
            ,
            t._updateDuration = function() {
                this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._pause(),
                this._resume())
            }
            ,
            createjs.WebAudioSoundInstance = createjs.promote(e, "AbstractSoundInstance")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e() {
                this.AbstractPlugin_constructor(),
                this._panningModel = n._panningModel,
                this.context = n.context,
                this.dynamicsCompressorNode = this.context.createDynamicsCompressor(),
                this.dynamicsCompressorNode.connect(this.context.destination),
                this.gainNode = this.context.createGain(),
                this.gainNode.connect(this.dynamicsCompressorNode),
                createjs.WebAudioSoundInstance.destinationNode = this.gainNode,
                this._capabilities = n._capabilities,
                this._loaderClass = createjs.WebAudioLoader,
                this._soundInstanceClass = createjs.WebAudioSoundInstance,
                this._addPropsToClasses()
            }
            var t = createjs.extend(e, createjs.AbstractPlugin)
              , n = e;
            n._capabilities = null,
            n._panningModel = "equalpower",
            n.context = null,
            n.isSupported = function() {
                var e = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry;
                return !("file:" == location.protocol && !e && !this._isFileXHRSupported()) && (n._generateCapabilities(),
                null != n.context)
            }
            ,
            n.playEmptySound = function() {
                if (null != n.context) {
                    var e = n.context.createBufferSource();
                    e.buffer = n.context.createBuffer(1, 1, 22050),
                    e.connect(n.context.destination),
                    e.start(0, 0, 0)
                }
            }
            ,
            n._isFileXHRSupported = function() {
                var e = !0
                  , t = new XMLHttpRequest;
                try {
                    t.open("GET", "WebAudioPluginTest.fail", !1)
                } catch (n) {
                    return e = !1
                }
                t.onerror = function() {
                    e = !1
                }
                ,
                t.onload = function() {
                    e = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response
                }
                ;
                try {
                    t.send()
                } catch (n) {
                    e = !1
                }
                return e
            }
            ,
            n._generateCapabilities = function() {
                if (null == n._capabilities) {
                    var e = document.createElement("audio");
                    if (null == e.canPlayType)
                        return null;
                    if (null == n.context)
                        if (window.AudioContext)
                            n.context = new AudioContext;
                        else {
                            if (!window.webkitAudioContext)
                                return null;
                            n.context = new webkitAudioContext
                        }
                    n._compatibilitySetUp(),
                    n.playEmptySound(),
                    n._capabilities = {
                        panning: !0,
                        volume: !0,
                        tracks: -1
                    };
                    for (var t = createjs.Sound.SUPPORTED_EXTENSIONS, r = createjs.Sound.EXTENSION_MAP, i = 0, o = t.length; o > i; i++) {
                        var a = t[i]
                          , s = r[a] || a;
                        n._capabilities[a] = "no" != e.canPlayType("audio/" + a) && "" != e.canPlayType("audio/" + a) || "no" != e.canPlayType("audio/" + s) && "" != e.canPlayType("audio/" + s)
                    }
                    n.context.destination.numberOfChannels < 2 && (n._capabilities.panning = !1)
                }
            }
            ,
            n._compatibilitySetUp = function() {
                if (n._panningModel = "equalpower",
                !n.context.createGain) {
                    n.context.createGain = n.context.createGainNode;
                    var e = n.context.createBufferSource();
                    e.__proto__.start = e.__proto__.noteGrainOn,
                    e.__proto__.stop = e.__proto__.noteOff,
                    n._panningModel = 0
                }
            }
            ,
            t.toString = function() {
                return "[WebAudioPlugin]"
            }
            ,
            t._addPropsToClasses = function() {
                var e = this._soundInstanceClass;
                e.context = this.context,
                e.destinationNode = this.gainNode,
                e._panningModel = this._panningModel,
                this._loaderClass.context = this.context
            }
            ,
            t._updateVolume = function() {
                var e = createjs.Sound._masterMute ? 0 : this._volume;
                e != this.gainNode.gain.value && (this.gainNode.gain.value = e)
            }
            ,
            createjs.WebAudioPlugin = createjs.promote(e, "AbstractPlugin")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e() {
                throw "HTMLAudioTagPool cannot be instantiated"
            }
            function t() {
                this._tags = []
            }
            var n = e;
            n._tags = {},
            n._tagPool = new t,
            n._tagUsed = {},
            n.get = function(e) {
                var t = n._tags[e];
                return null == t ? (t = n._tags[e] = n._tagPool.get(),
                t.src = e) : n._tagUsed[e] ? (t = n._tagPool.get(),
                t.src = e) : n._tagUsed[e] = !0,
                t
            }
            ,
            n.set = function(e, t) {
                t == n._tags[e] ? n._tagUsed[e] = !1 : n._tagPool.set(t)
            }
            ,
            n.remove = function(e) {
                var t = n._tags[e];
                return null != t && (n._tagPool.set(t),
                delete n._tags[e],
                delete n._tagUsed[e],
                !0)
            }
            ,
            n.getDuration = function(e) {
                var t = n._tags[e];
                return null == t ? 0 : 1e3 * t.duration
            }
            ,
            createjs.HTMLAudioTagPool = e;
            var r = t.prototype;
            r.constructor = t,
            r.get = function() {
                var e;
                return e = 0 == this._tags.length ? this._createTag() : this._tags.pop(),
                null == e.parentNode && document.body.appendChild(e),
                e
            }
            ,
            r.set = function(e) {
                var t = createjs.indexOf(this._tags, e);
                -1 == t && (this._tags.src = null,
                this._tags.push(e))
            }
            ,
            r.toString = function() {
                return "[TagPool]"
            }
            ,
            r._createTag = function() {
                var e = document.createElement("audio");
                return e.autoplay = !1,
                e.preload = "none",
                e
            }
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e(e, t, n, r) {
                this.AbstractSoundInstance_constructor(e, t, n, r),
                this._audioSpriteStopTime = null,
                this._delayTimeoutId = null,
                this._endedHandler = createjs.proxy(this._handleSoundComplete, this),
                this._readyHandler = createjs.proxy(this._handleTagReady, this),
                this._stalledHandler = createjs.proxy(this._playFailed, this),
                this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this),
                this._loopHandler = createjs.proxy(this._handleSoundComplete, this),
                n ? this._audioSpriteStopTime = .001 * (t + n) : this._duration = createjs.HTMLAudioTagPool.getDuration(this.src)
            }
            var t = createjs.extend(e, createjs.AbstractSoundInstance);
            t.setMasterVolume = function() {
                this._updateVolume()
            }
            ,
            t.setMasterMute = function() {
                this._updateVolume()
            }
            ,
            t.toString = function() {
                return "[HTMLAudioSoundInstance]"
            }
            ,
            t._removeLooping = function() {
                null != this._playbackResource && (this._playbackResource.loop = !1,
                this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
            }
            ,
            t._addLooping = function() {
                null == this._playbackResource || this._audioSpriteStopTime || (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
                this._playbackResource.loop = !0)
            }
            ,
            t._handleCleanUp = function() {
                var e = this._playbackResource;
                if (null != e) {
                    e.pause(),
                    e.loop = !1,
                    e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                    e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
                    e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
                    e.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
                    e.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1);
                    try {
                        e.currentTime = this._startTime
                    } catch (t) {}
                    createjs.HTMLAudioTagPool.set(this.src, e),
                    this._playbackResource = null
                }
            }
            ,
            t._beginPlaying = function(e) {
                return this._playbackResource = createjs.HTMLAudioTagPool.get(this.src),
                this.AbstractSoundInstance__beginPlaying(e)
            }
            ,
            t._handleSoundReady = function() {
                if (4 !== this._playbackResource.readyState) {
                    var e = this._playbackResource;
                    return e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
                    e.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
                    e.preload = "auto",
                    void e.load()
                }
                this._updateVolume(),
                this._playbackResource.currentTime = .001 * (this._startTime + this._position),
                this._audioSpriteStopTime ? this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1) : (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                0 != this._loop && (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
                this._playbackResource.loop = !0)),
                this._playbackResource.play()
            }
            ,
            t._handleTagReady = function() {
                this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1),
                this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1),
                this._handleSoundReady()
            }
            ,
            t._pause = function() {
                this._playbackResource.pause()
            }
            ,
            t._resume = function() {
                this._playbackResource.play()
            }
            ,
            t._updateVolume = function() {
                if (null != this._playbackResource) {
                    var e = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume;
                    e != this._playbackResource.volume && (this._playbackResource.volume = e)
                }
            }
            ,
            t._calculateCurrentPosition = function() {
                return 1e3 * this._playbackResource.currentTime - this._startTime
            }
            ,
            t._updatePosition = function() {
                this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1),
                this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1);
                try {
                    this._playbackResource.currentTime = .001 * (this._position + this._startTime)
                } catch (e) {
                    this._handleSetPositionSeek(null)
                }
            }
            ,
            t._handleSetPositionSeek = function() {
                null != this._playbackResource && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1),
                this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
            }
            ,
            t._handleAudioSpriteLoop = function() {
                this._playbackResource.currentTime <= this._audioSpriteStopTime || (this._playbackResource.pause(),
                0 == this._loop ? this._handleSoundComplete(null) : (this._position = 0,
                this._loop--,
                this._playbackResource.currentTime = .001 * this._startTime,
                this._paused || this._playbackResource.play(),
                this._sendEvent("loop")))
            }
            ,
            t._handleLoop = function() {
                0 == this._loop && (this._playbackResource.loop = !1,
                this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1))
            }
            ,
            t._updateStartTime = function() {
                this._audioSpriteStopTime = .001 * (this._startTime + this._duration),
                this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
            }
            ,
            t._updateDuration = function() {
                this._audioSpriteStopTime = .001 * (this._startTime + this._duration),
                this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1),
                this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1))
            }
            ,
            createjs.HTMLAudioSoundInstance = createjs.promote(e, "AbstractSoundInstance")
        }(),
        window.createjs = window.createjs || {},
        function() {
            "use strict";
            function e() {
                this.AbstractPlugin_constructor(),
                this.defaultNumChannels = 2,
                this._capabilities = n._capabilities,
                this._loaderClass = createjs.SoundLoader,
                this._soundInstanceClass = createjs.HTMLAudioSoundInstance
            }
            var t = createjs.extend(e, createjs.AbstractPlugin)
              , n = e;
            n.MAX_INSTANCES = 30,
            n._AUDIO_READY = "canplaythrough",
            n._AUDIO_ENDED = "ended",
            n._AUDIO_SEEKED = "seeked",
            n._AUDIO_STALLED = "stalled",
            n._TIME_UPDATE = "timeupdate",
            n._capabilities = null,
            n.isSupported = function() {
                return n._generateCapabilities(),
                null != n._capabilities
            }
            ,
            n._generateCapabilities = function() {
                if (null == n._capabilities) {
                    var e = document.createElement("audio");
                    if (null == e.canPlayType)
                        return null;
                    n._capabilities = {
                        panning: !1,
                        volume: !0,
                        tracks: -1
                    };
                    for (var t = createjs.Sound.SUPPORTED_EXTENSIONS, r = createjs.Sound.EXTENSION_MAP, i = 0, o = t.length; o > i; i++) {
                        var a = t[i]
                          , s = r[a] || a;
                        n._capabilities[a] = "no" != e.canPlayType("audio/" + a) && "" != e.canPlayType("audio/" + a) || "no" != e.canPlayType("audio/" + s) && "" != e.canPlayType("audio/" + s)
                    }
                }
            }
            ,
            t.register = function(e) {
                var t = createjs.HTMLAudioTagPool.get(e.src)
                  , n = this.AbstractPlugin_register(e);
                return n.setTag(t),
                n
            }
            ,
            t.removeSound = function(e) {
                this.AbstractPlugin_removeSound(e),
                createjs.HTMLAudioTagPool.remove(e)
            }
            ,
            t.create = function(e, t, n) {
                var r = this.AbstractPlugin_create(e, t, n);
                return r.setPlaybackResource(null),
                r
            }
            ,
            t.toString = function() {
                return "[HTMLAudioPlugin]"
            }
            ,
            t.setVolume = t.getVolume = t.setMute = null,
            createjs.HTMLAudioPlugin = createjs.promote(e, "AbstractPlugin")
        }(),
        "object" == typeof t && (t.exports = window.createjs.Sound)
    }
    , {}],
    42: [function(e, t, n) {
        function r() {
            M = !0,
            isMobile ? (s(),
            b.hide(),
            I.start(),
            I.startAudio()) : b.fadeOut(500, function() {
                document.body.cursor = "auto",
                I.start(),
                I.startAudio()
            })
        }
        function i() {
            function e(e) {
                if (t.requestPointerLock = t.requestPointerLock || t.mozRequestPointerLock || t.webkitRequestPointerLock,
                /Firefox/i.test(navigator.userAgent)) {
                    var n = function(e) {
                        document.fullscreenElement !== t && document.mozFullscreenElement !== t && document.mozFullScreenElement !== t || (document.removeEventListener("fullscreenchange", n),
                        document.removeEventListener("mozfullscreenchange", n),
                        t.requestPointerLock())
                    };
                    document.addEventListener("fullscreenchange", n, !1),
                    document.addEventListener("mozfullscreenchange", n, !1),
                    t.requestFullscreen = t.requestFullscreen || t.mozRequestFullscreen || t.mozRequestFullScreen || t.webkitRequestFullscreen,
                    t.requestFullscreen()
                } else
                    t.requestPointerLock()
            }
            var t = document.body
              , n = function(e) {
                R = !R,
                R ? (I.resume(),
                $("body").removeClass("paused")) : (I.pause(),
                $("body").addClass("paused"))
            }
              , r = function(e) {
                console.log(e)
            };
            document.addEventListener("pointerlockchange", n, !1),
            document.addEventListener("mozpointerlockchange", n, !1),
            document.addEventListener("webkitpointerlockchange", n, !1),
            document.addEventListener("pointerlockerror", r, !1),
            document.addEventListener("mozpointerlockerror", r, !1),
            document.addEventListener("webkitpointerlockerror", r, !1),
            E.on("click", e),
            x.on("click", e)
        }
        function o() {
            var e = window.navigator.userAgent
              , t = e.indexOf("MSIE ");
            if (t > 0)
                return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
            var n = e.indexOf("Trident/");
            if (n > 0) {
                var r = e.indexOf("rv:");
                return parseInt(e.substring(r + 3, e.indexOf(".", r)), 10)
            }
            var i = e.indexOf("Edge/");
            return i > 0 && parseInt(e.substring(i + 5, e.indexOf(".", i)), 10)
        }
        function a(e, t, n) {
            var r = ($(window).width() - t) / 2
              , i = ($(window).height() - n) / 2
              , o = "status=1,width=" + t + ",height=" + n + ",top=" + i + ",left=" + r;
            return window.open(e, "twitter", o),
            !1
        }
        function s() {
            var e = document.body;
            e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen()
        }
        function u() {
            var e = document.createElement("audio");
            return !(!e.canPlayType || !e.canPlayType("audio/mpeg;").replace(/no/, ""))
        }
        function c() {
            if (/iP(hone|od|ad)/.test(navigator.platform)) {
                var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3] || 0, 10)]
            }
        }
        e("15"),
        e("28").polyfill(),
        e("39");
        var l = e("10")
          , h = e("11")
          , f = e("12")
          , p = e("31")
          , d = e("14")
          , v = e("34")
          , _ = e("40")
          , m = e("33")
          , g = "interior_mobile"
          , T = "mobile_env"
          , y = 66
          , b = $(".loading")
          , S = $(".progress")
          , P = $(".percentage")
          , E = $(".start")
          , A = $(".warning")
          , w = $(".js-sharing")
          , M = !1
          , x = $("#resume")
          , C = "pointerLockElement"in document || "mozPointerLockElement"in document || "webkitPointerLockElement"in document
          , R = !1;
        window.isIE = o(),
        window.canPlayMp3 = u();
        var H = new _(window.navigator.userAgent);
        window.phone = H.phone();
        var j = "iPhone" === window.phone;
        if (j) {
            var L = c();
            window.canPlayInlineVideo = !L || L[0] >= 10
        } else
            window.canPlayInlineVideo = !0;
        h.manager.onProgress = function(e, t, n) {
            P.html(Math.round(t / y * 100))
        }
        ,
        THREE.MaterialLoader.setShaders(m);
        var G = d.isAvailable()
          , O = d.isLatestAvailable();
        G ? O || A.html('Your version of WebVR is out of date. <a href="http://webvr.info">Fix this</a>') : (A.show(),
        A.html('Your browser does not support WebVR. <a href="http://webvr.info">Fix this</a>'),
        E.html("Start without VR"));
        var I = new p({
            maxPixelRatio: 1.5
        });
        I.renderer.setClearColor(16777215),
        G || (C ? i() : $("canvas").addClass("no-pointerlock"));
        var B = {
            sh: [v.ENV],
            textures: ["textures/white.png", "textures/spacebar.png", "textures/normal.png", "textures/slideshow/1.jpg", "textures/slideshow/2.jpg", "textures/slideshow/3.jpg", "textures/slideshow/4.jpg", "textures/cubemaps/common/negx.jpg", "textures/cubemaps/common/negz.jpg", "textures/cubemaps/common/posy.jpg", "textures/cubemaps/manual-leather/negy.jpg", "textures/cubemaps/manual-leather/posx.jpg", "textures/cubemaps/manual-leather/posz.jpg", "textures/cubemaps/manual-cloth/negy.jpg", "textures/cubemaps/manual-cloth/posx.jpg", "textures/cubemaps/manual-cloth/posz.jpg", "textures/cubemaps/manual-leathercloth/negy.jpg", "textures/cubemaps/manual-leathercloth/posx.jpg", "textures/cubemaps/manual-leathercloth/posz.jpg", "textures/cubemaps/auto-leather/negy.jpg", "textures/cubemaps/auto-leather/posx.jpg", "textures/cubemaps/auto-leather/posz.jpg", "textures/cubemaps/auto-cloth/negy.jpg", "textures/cubemaps/auto-cloth/posx.jpg", "textures/cubemaps/auto-cloth/posz.jpg", "textures/cubemaps/auto-leathercloth/negy.jpg", "textures/cubemaps/auto-leathercloth/posx.jpg", "textures/cubemaps/auto-leathercloth/posz.jpg"]
        };
        //THREE.Extensions.get("EXT_shader_texture_lod") ? B.cubemaps = [v.ENV + "/cubemap.bin"] : B.panoramas = [v.ENV + "/panorama.bin"];
        var D = new l(B);
        D.load().then(function(e) {
            h.texturePath = "assets/" + T + "/",
            f.loadScene(T, I, ".js").then(function(e) {
                I.envScene = e,
                h.texturePath = "assets/" + g + "/",
                f.loadScene(g, I, ".js").then(function(e) {
                    S.hide(),
                    E.css("display", "inline-block"),
                    I.init({
                        pointerLock: C
                    })
                })
            })
        }),
        E.on("click", function() {
            M || (E.css("cursor", "default"),
            E.addClass("frozen"),
            r())
        }),
        w.on("click", function() {
            var e = $(this).data("href")
              , t = $(this).data("width")
              , n = $(this).data("height");
            a(e, t, n)
        })
    }
    , {
        10: 10,
        11: 11,
        12: 12,
        14: 14,
        15: 15,
        28: 28,
        31: 31,
        33: 33,
        34: 34,
        39: 39,
        40: 40
    }],
    43: [function(e, t, n) {
        var r = e("18")
          , i = e("33")
          , o = (e("13"),
        function(e) {
            e = Object.assign({
                vertexShader: i["basic.vs"],
                fragmentShader: i["basic.fs"],
                uniforms: {
                    diffuse: {
                        type: "c",
                        value: new THREE.Color(16777215)
                    },
                    map: {
                        type: "t",
                        value: null
                    },
                    offsetRepeat: {
                        type: "v4",
                        value: new THREE.Vector4(0,0,1,1)
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    }
                }
            }, e),
            r.call(this, e),
            Object.keys(this.uniforms).forEach(function(e) {
                this.onPropertyChange(e, function(t) {
                    this.uniforms[e].value = t
                })
            }, this)
        }
        );
        o.inherit(r, {
            clone: function(e) {
                var t = e || new o;
                return r.prototype.clone.call(this, t),
                t.name = this.name,
                t.transparent = this.transparent,
                _.each(this.uniforms, function(e, n) {
                    var r = e.type;
                    "v2" === r || "m4" === r ? t.uniforms[n].value.copy(e.value) : t.uniforms[n].value = e.value
                }, this),
                t
            }
        }),
        t.exports = o
    }
    , {
        13: 13,
        18: 18,
        33: 33
    }],
    44: [function(e, t, n) {
        var r = e("18")
          , i = e("33")
          , o = function(e) {
            e = Object.assign({
                vertexShader: i["spinner.vs"],
                fragmentShader: i["spinner.fs"],
                uniforms: {
                    color: {
                        type: "c",
                        value: new THREE.Color(16777215)
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    progress: {
                        type: "f",
                        value: 0
                    }
                }
            }, e),
            r.call(this, e),
            Object.keys(this.uniforms).forEach(function(e) {
                this.onPropertyChange(e, function(t) {
                    this.uniforms[e].value = t
                })
            }, this)
        };
        o.inherit(r),
        t.exports = o
    }
    , {
        18: 18,
        33: 33
    }],
    45: [function(e, t, n) {
        var r = e("18")
          , i = e("33")
          , o = (e("13"),
        function(e) {
            e = Object.assign({
                vertexShader: i["ui.vs"],
                fragmentShader: i["ui.fs"],
                uniforms: {
                    diffuse: {
                        type: "c",
                        value: new THREE.Color(16711935)
                    },
                    map: {
                        type: "t",
                        value: null
                    },
                    offsetRepeat: {
                        type: "v4",
                        value: new THREE.Vector4(0,0,1,1)
                    },
                    opacity: {
                        type: "f",
                        value: 1
                    },
                    alphaThreshold: {
                        type: "f",
                        value: 2
                    },
                    smoothingOffset: {
                        type: "f",
                        value: .05
                    },
                    active: {
                        value: null
                    }
                }
            }, e),
            r.call(this, e),
            Object.keys(this.uniforms).forEach(function(e) {
                this.onPropertyChange(e, function(t) {
                    this.uniforms[e].value = t
                })
            }, this),
            this.smoothingOffset = this.uniforms.smoothingOffset.value,
            this.animDuration = 1e3,
            this.easing = TWEEN.Easing.Quintic.Out,
            this.active = !1,
            this.tweens = {
                fade: new TWEEN.Tween,
                animation: new TWEEN.Tween
            }
        }
        );
        o.inherit(r, {
            clone: function(e) {
                var t = e || new o;
                return r.prototype.clone.call(this, t),
                t.name = this.name,
                t.transparent = this.transparent,
                _.each(this.uniforms, function(e, n) {
                    var r = e.type;
                    "v2" === r || "m4" === r ? t.uniforms[n].value.copy(e.value) : t.uniforms[n].value = e.value
                }, this),
                t
            },
            resetAlphaThreshold: function() {
                this.uniforms.alphaThreshold.value = 2
            },
            animate: function() {
                return this.resetAlphaThreshold(),
                this.tweens.animation.reset(this.uniforms.alphaThreshold).to({
                    value: 0
                }, this.animDuration).easing(this.easing)
            },
            activate: function() {
                this.active = !0
            },
            deactivate: function() {
                this.active = !1
            },
            fadeIn: function(e) {
                return this.opacity = 0,
                this.tweens.fade.reset(this).to({
                    opacity: .5
                }, e || 200).easing(TWEEN.Easing.Quadratic.Out).start()
            },
            fadeOut: function(e) {
                return this.tweens.fade.reset(this).to({
                    opacity: 0
                }, e || 200).easing(TWEEN.Easing.Quadratic.Out).start()
            },
            setColor: function(e) {
                this.uniforms.diffuse.value.setHex(e)
            }
        }),
        t.exports = o
    }
    , {
        13: 13,
        18: 18,
        33: 33
    }],
    46: [function(e, t, n) {
        function r() {
            var e = navigator.userAgent || navigator.vendor || window.opera;
            return e.indexOf("FBAN") > -1 || e.indexOf("FBAV") > -1
        }
        var i = e("3")
          , o = function(e) {
            e = e || {},
            this.objects = [],
            this.mouseCoords = {
                x: 0,
                y: 0
            },
            this.camera = e.camera,
            this.checkFlag = void 0 !== e.checkFlag && e.checkFlag,
            this.$container = $(document.body),
            this.$container.on("tap", this.onTap.bind(this))
        };
        o.prototype = {
            add: function(e, t) {
                _.isArray(e) || (e = [e]),
                t.traverse(function(t) {
                    t instanceof THREE.Mesh && _.include(e, t.name) && (this.objects.push(t),
                    t.pickable = !0)
                }
                .bind(this))
            },
            remove: function(e) {
                for (var t = 0; t < this.objects.length; t++) {
                    var n = this.objects[t].id;
                    if (n === e.id) {
                        this.objects.splice(t, 1);
                        break
                    }
                }
            },
            clear: function() {
                this.objects = []
            },
            onTap: function(e) {
                var t = {
                    x: this.$container.offset().left,
                    y: this.$container.offset().top
                }
                  , n = e.clientX - t.x
                  , i = e.clientY - t.y;
                r() && "iPhone" === window.phone && (i += 64);
                var o = n / this.$container.width() * 2 - 1
                  , a = 1 - i / this.$container.height() * 2
                  , s = this.hitTestClick(o, a);
                s && this.trigger("pick", s)
            },
            hitTestClick: function() {
                var e = new THREE.Vector3
                  , t = new THREE.Vector3;
                return function(n, r) {
                    t.set(n, r, 1),
                    this.camera.getWorldPosition(e);
                    var i = t.unproject(this.camera)
                      , o = new THREE.Raycaster(e,i.sub(e).normalize())
                      , a = o.intersectObjects(this.objects);
                    if (a.length > 0) {
                        var s = _.find(a, function(e) {
                            return this.checkFlag ? void 0 !== e.object.pickable && e.object.pickable === !0 : e.object
                        }, this);
                        if (s)
                            return s.object
                    }
                    return null
                }
            }(),
            hitTest: function() {
                var e = new THREE.Vector3
                  , t = new THREE.Vector3;
                return function() {
                    this.camera.getWorldPosition(t),
                    this.camera.getWorldDirection(e);
                    var n = new THREE.Raycaster(t,e)
                      , r = n.intersectObjects(this.objects);
                    if (r.length > 0) {
                        var i = _.find(r, function(e) {
                            return this.checkFlag ? void 0 !== e.object.pickable && e.object.pickable === !0 : e.object
                        }, this);
                        if (i)
                            return i.object
                    }
                    return null
                }
            }(),
            updateMouseCoords: function(e) {
                this.mouseCoords = e
            },
            update: function() {
                var e = this.hitTestClick(this.mouseCoords.x, this.mouseCoords.y);
                (e && this.currentObj && this.currentObj !== e || !e && this.currentObj) && (this.trigger("leave", this.currentObj),
                this.currentObj = null),
                e && !this.currentObj && (this.trigger("enter", e),
                this.currentObj = e)
            }
        },
        o.mixin(i),
        t.exports = o
    }
    , {
        3: 3
    }],
    47: [function(e, t, n) {
        var r = (e("4"),
        e("13"),
        e("3"))
          , i = e("37")
          , o = e("35")
          , a = function(e, t) {
            this.scene = e,
            this.configData = t
        };
        a.prototype = {
            setDefaults: function() {
                _.each(Config.DEFAULTS, function(e, t) {
                    this.configure(t, e)
                }, this)
            },
            initConfigurables: function() {
                this.scene.configurables = {},
                _.each(this.configData, function(e) {
                    _.each(e, function(e) {
                        e.forEach(function(e) {
                            var t = _.filter(this.getObjectsByName(e), function(e) {
                                return "hotspots" !== e.parent.name
                            });
                            t.length > 0 && (this.scene.configurables[e] = new o(t[0]))
                        }, this)
                    }, this)
                }, this)
            },
            configure: function(e, t) {
                "siege_avant_droite" === e ? (this.frontSeatLeft.material = this.getMaterialByName(this.configData[e][t][0]),
                this.frontSeatRight.material = this.getMaterialByName(this.configData[e][t][1]),
                this.rearSeats.material = this.getMaterialByName(this.configData[e][t][2]),
                "leathercloth" === t ? this.seams.material.opacity = .25 : this.seams.material.opacity = 1) : _.each(this.configData[e], function(e, n) {
                    var r = _.compact(_.map(e, function(e) {
                        var t = this.scene.configurables[e].mesh;
                        return t ? this.scene.getObjectByName(e) : void console.warn("No object named " + e + " found.")
                    }, this));
                    r.forEach(function(e) {
                        TWEEN.Easing.Linear.None;
                        t === n ? this.scene.configurables[e.name].mesh.visible = !0 : this.scene.configurables[e.name].mesh.visible = !1
                    }, this)
                }, this)
            },
            getMaterialByName: function(e) {
                return _.find(this.scene.materials, function(t) {
                    return t.name === e
                })
            },
            initHotspots: function() {
                var e = [];
                this.hotspots = [],
                _.each(this.scene.getObjectByName("hotspots").children, function(t) {
                    var n = t.getWorldPosition();
                    e.push({
                        name: t.name,
                        position: [n.x, n.y, n.z],
                        maxSize: .05,
                        minDistance: 0
                    })
                }, this),
                e.forEach(function(e) {
                    this.addHotspot(e)
                }, this)
            },
            addHotspot: function(e) {
                var t = new i(e);
                this.hotspots.push(t),
                this.scene.add(t)
            },
            hideHotspot: function(e) {
                _.find(this.hotspots, function(t) {
                    return t.name === e
                }).fadeOut()
            },
            showHotspot: function(e) {
                _.find(this.hotspots, function(t) {
                    return t.name === e
                }).fadeIn()
            },
            getObjectsByName: function(e) {
                var t = [];
                return this.scene.traverse(function(n) {
                    n.name === e && t.push(n)
                }),
                t
            },
            update: function(e) {
                _.invoke(this.hotspots, "update", e)
            }
        },
        a.mixin(r),
        t.exports = a
    }
    , {
        13: 13,
        3: 3,
        35: 35,
        37: 37,
        4: 4
    }],
    48: [function(e, t, n) {
        var r = e("11")
          , i = function(e) {
            this.object = e,
            this.initSlides(),
            this.currentSlide = this.slides[0],
            this.currentIndex = 0,
            this.transitionDuration = 1e3,
            setInterval(function() {
                this.currentIndex++,
                this.currentIndex > this.slides.length - 1 && (this.currentIndex = 0),
                this.showSlide(this.currentIndex)
            }
            .bind(this), 4e3),
            this.tweens = {
                transition: new TWEEN.Tween
            }
        };
        i.prototype = {
            initSlides: function() {
                this.slides = [],
                this.object.children.forEach(function(e, t) {
                    e.material = new THREE.MeshBasicMaterial({
                        map: r.getTexture("textures/slideshow/" + (t + 1) + ".jpg"),
                        transparent: !0,
                        depthWrite: !1
                    }),
                    this.slides.push(e),
                    t > 0 && (e.visible = !1)
                }, this)
            },
            showSlide: function(e) {
                this.slides[e].visible = !0,
                this.tweens.transition.reset(this.currentSlide.material).to({
                    opacity: 0
                }, this.transitionDuration).onUpdate(function(t) {
                    this.slides[e].material.opacity = t
                }
                .bind(this)).onComplete(function() {
                    this.currentSlide.visible = !1,
                    this.currentSlide = this.slides[e]
                }
                .bind(this)).start()
            }
        },
        t.exports = i
    }
    , {
        11: 11
    }],
    49: [function(e, t, n) {
        var r = e("44")
          , i = function(e) {
            THREE.Mesh.call(this, new THREE.TorusGeometry(.005,.001,8,64), new r({
                opacity: .5,
                transparent: !0,
                depthTest: !1
            })),
            this.tweens = {
                spin: new TWEEN.Tween,
                fadeOut: new TWEEN.Tween
            },
            this.rotation.y = Math.PI,
            this.rotation.z = Math.PI / 2,
            this.position.z = -.5,
            this.renderOrder = 500
        };
        i.inherit(THREE.Mesh, {
            animate: function(e, t) {
                var n = this.tweens.spin
                  , r = this.tweens.fadeOut
                  , i = this.material.uniforms.progress
                  , o = this.material.uniforms.opacity;
                this.reset(),
                n.reset(i).to({
                    value: 1
                }, e).chain(r),
                r.reset(o).to({
                    value: 0
                }, 250),
                n.start(),
                t && r.onComplete(t)
            },
            reset: function() {
                this.tweens.spin.stop(),
                this.tweens.fadeOut.stop(),
                this.material.uniforms.progress.value = 0,
                this.material.uniforms.opacity.value = 1
            },
            hide: function() {
                this.visible = !1
            },
            show: function() {
                this.visible = !0
            }
        }),
        t.exports = i
    }
    , {
        44: 44
    }],
    50: [function(e, t, n) {
        function r(e) {
            return "text" === e.name
        }
        function i(e) {
            return "panel" === e.parent.name
        }
        function o(e) {
            return e.parent.parent.visible
        }
        function a(e) {
            var t = [];
            return e.parent.traverse(function(e) {
                t.push(e)
            }),
            _.filter(t, function(t) {
                return t !== e && t !== e.parent && t.parent === e.parent
            })
        }
        var s = e("4")
          , u = (e("13"),
        e("3"))
          , c = e("32")
          , l = 44783
          , h = 5592405
          , f = function(e, t) {
            this.scene = e,
            this.panels = _.object(_.map(t, function(t, n) {
                var r = e.getObjectByName("panel_" + n);
                return r ? [n, {
                    object: r,
                    name: n
                }] : void console.warn("No panel with name panel_" + n + " found.")
            })),
            this.initButtons(),
            this.initActiveObjects(),
            this.activateDefaults(),
            this.panelTimer = new s,
            this.buttonTimer = new s
        };
        f.prototype = {
            activateDefaults: function() {
                _.each(Config.DEFAULTS, function(e, t) {
                    this.activateButton(this.panels[t].buttons[e])
                }, this)
            },
            initButtons: function() {
                _.each(this.panels, function(e) {
                    e.buttons = {},
                    e.object.traverse(function(t) {
                        if (i(t)) {
                            var n = t.name.indexOf("_") !== -1 ? t.name.split("_")[1] : t.name;
                            e.buttons[n] = t,
                            t.optionType = e.name,
                            t.optionName = n
                        }
                    })
                }, this)
            },
            initActiveObjects: function() {
                _.each(this.panels, function(e) {
                    e.activeObjects = [],
                    e.object.traverse(function(t) {
                        "active" == t.name && e.activeObjects.push(t)
                    }),
                    e.activeObjects.forEach(function(e) {
                        e.material.active = !0,
                        e.renderOrder = 201,
                        e.parent.renderOrder = 202,
                        e.parent.activeObject = e,
                        e.material.opacity = .5,
                        e.material.setColor(0),
                        e.material.depthTest = !1
                    })
                })
            },
            pickObject: function(e) {
                if (i(e) && o(e) && e !== this.currentActiveButton && !r(e))
                    this.activateButton(e),
                    this.trigger("showObject", e.optionType, e.optionName);
                else {
                    var t = e.name.replace(/[0-9]/g, "")
                      , n = this.panels[t];
                    if (!n)
                        return void console.log("No panel found with name " + t);
                    if (n === this.currentPanel)
                        return;
                    this.currentPanel && this.hidePanel(this.currentPanel),
                    this.showPanel(n.object),
                    this.currentPanel = n,
                    this.trigger("showPanel", n.name)
                }
            },
            enterObject: function(e, t) {
                i(e) && !r(e) && o(e) && this.highlightButton(e)
            },
            leaveObject: function(e) {
                i(e) && !r(e) && o(e) && this.unHighlightButton(e)
            },
            enterButton: function(e) {
                return this.panelTimer.pause(),
                e !== this.currentActiveButton && !e.active && !r(e) && (this.buttonTimer.reset(),
                this.buttonTimer.duration = 900,
                this.buttonTimer.start(),
                this.highlightButton(e),
                this.buttonTimer.endCallback = function(e) {
                    this.activateButton(e),
                    this.trigger("showObject", e.optionType, e.optionName)
                }
                .bind(this, e),
                !0)
            },
            leaveButton: function(e) {
                this.panelTimer.elapsedTime = 0,
                this.panelTimer.resume(),
                this.unHighlightButton(e),
                this.buttonTimer.ended || this.buttonTimer.stop()
            },
            unHighlightButton: function(e) {
                e.active || e.activeObject.material.setColor(0)
            },
            highlightButton: function(e) {
                e.active || (e.activeObject.visible = !0,
                e.activeObject.material.setColor(h),
                c.play("hover"))
            },
            activateButton: function(e) {
                e.activeObject.visible = !0,
                e.activeObject.material.setColor(l),
                e.active = !0,
                this.currentActiveButton = e,
                a(e).forEach(function(e) {
                    this.deactivateButton(e)
                }, this),
                c.play("button")
            },
            deactivateButton: function(e) {
                e.active = !1,
                e.activeObject.material.setColor(0)
            },
            showPanel: function(e) {
                var t = [];
                e.traverse(function(e) {
                    if (e.name.indexOf("line") !== -1) {
                        var n = parseInt(e.name.replace("line", "")) - 1;
                        t[n] = e
                    }
                });
                var n = e.getObjectByName("panel");
                e.visible = !0,
                e.traverse(function(e) {
                    e.material && e.material.resetAlphaThreshold(),
                    i(e) && (e.activeObject.material.opacity = 0,
                    e.pickable = !0)
                });
                var r = function() {
                    n.traverse(function(e) {
                        e.material && e.material.animate().start(),
                        i(e) && e.activeObject.material.fadeIn(1e3)
                    })
                };
                t.length > 0 ? (t.forEach(function(e, n) {
                    var i = e.material.animate();
                    if (t[n + 1]) {
                        var o = t[n + 1].material.tweens.animation;
                        i.chain(o)
                    }
                    n === t.length - 1 && i.onComplete(r)
                }),
                t[0].material.tweens.animation.start()) : r(),
                c.play("panel")
            },
            hidePanel: function(e) {
                e.object.traverse(function(t) {
                    t.pickable = !1,
                    t.material && (t.material.previousOpacity = t.material.opacity,
                    t.material.fadeOut(500).onComplete(function() {
                        e.object.visible = !1,
                        t.material.opacity = 1,
                        this.trigger("hidePanel", e.name)
                    }
                    .bind(this)))
                }
                .bind(this))
            },
            hideCurrentPanel: function() {
                this.currentPanel && (this.hidePanel(this.currentPanel),
                this.currentPanel = null)
            },
            hideAll: function() {
                _.each(this.panels, function(e) {
                    this.hidePanel(e)
                }, this)
            },
            isText: function(e) {
                return r(e)
            },
            update: function(e) {
                this.panelTimer.update(e),
                this.buttonTimer.update(e)
            }
        },
        f.mixin(u),
        t.exports = f
    }
    , {
        13: 13,
        3: 3,
        32: 32,
        4: 4
    }],
    51: [function(e, t, n) {
        var r = null
          , i = function() {
            function e() {
                vrDisplay.requestPresent([{
                    source: webglCanvas
                }]).then(function() {}, function() {
                    VRUtils.addError("requestPresent failed.", 2e3)
                })
            }
            function t() {
                vrDisplay.isPresenting && vrDisplay.exitPresent().then(function() {}, function() {
                    VRUtils.addError("exitPresent failed.", 2e3)
                })
            }
            function n() {
                onResize(),
                vrDisplay.isPresenting ? vrDisplay.capabilities.hasExternalDisplay && (presentingMessage.style.display = "block",
                VRUtils.removeButton(vrPresentButton),
                vrPresentButton = VRUtils.addButton("Exit VR", "E", "media/icons/cardboard64.png", t)) : vrDisplay.capabilities.hasExternalDisplay && (presentingMessage.style.display = "",
                VRUtils.removeButton(vrPresentButton),
                vrPresentButton = VRUtils.addButton("Enter VR", "E", "media/icons/cardboard64.png", e))
            }
            vrDisplay = null,
            navigator.getVRDisplays ? (r = new VRFrameData,
            navigator.getVRDisplays().then(function(r) {
                r.length > 0 ? (vrDisplay = this.vrDisplay = r[0],
                vrDisplay.depthNear = .1,
                vrDisplay.depthFar = 1024,
                vrDisplay.capabilities.canPresent && window.addEventListener("vrdisplaypresentchange", n, !1),
                window.addEventListener("vrdisplayactivate", e, !1),
                window.addEventListener("vrdisplaydeactivate", t, !1)) : VRUtils.addInfo("WebVR supported, but no VRDisplays found.", 3e3)
            }
            .bind(this))) : navigator.getVRDevices ? VRUtils.addError("Your browser supports WebVR but not the latest version. See <a href='http://webvr.info'>webvr.info</a> for more info.") : VRUtils.addError("Your browser does not support WebVR. See <a href='http://webvr.info'>webvr.info</a> for assistance.")
        };
        i.prototype.getFrameData = function() {
            return this.vrDisplay ? (this.vrDisplay.getFrameData(r),
            r) : null
        }
        ,
        t.exports = i
    }
    , {}]
}, {}, [42]);
