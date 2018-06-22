{
    "metadata": {
      "type": "Object",
      "generator": "unity-exporter",
      "version": 1
    },
    "geometries": [
      {
        "uuid": "CB467BDD-E193-4734-8420-6AEE37D65CC2",
        "name": "Quad",
        "type": "BufferGeometry",
        "data": {
          "index": {
            "array": [
              2,
              1,
              0,
              3,
              0,
              1
            ],
            "type": "Uint32Array"
          },
          "groups": [],
          "attributes": {
            "position": {
              "array": [
                -0.5,
                -0.5,
                3.0616168E-17,
                0.5,
                0.5,
                -3.0616168E-17,
                0.5,
                -0.5,
                3.0616168E-17,
                -0.5,
                0.5,
                -3.0616168E-17
              ],
              "type": "Float32Array",
              "itemSize": 3
            },
            "normal": {
              "array": [
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                1.0
              ],
              "type": "Float32Array",
              "itemSize": 3
            },
            "tangent": {
              "array": [
                1.0,
                0.0,
                0.0,
                1.0,
                1.0,
                0.0,
                0.0,
                1.0,
                1.0,
                0.0,
                0.0,
                1.0,
                1.0,
                0.0,
                0.0,
                1.0
              ],
              "type": "Float32Array",
              "itemSize": 4
            },
            "uv": {
              "array": [
                0.0,
                0.0,
                1.0,
                1.0,
                1.0,
                0.0,
                0.0,
                1.0
              ],
              "type": "Float32Array",
              "itemSize": 2
            }
          }
        }
      },
      {
        "uuid": "7493B451-1B08-4005-9564-A42958444180",
        "name": "Plane.002",
        "type": "BufferGeometry",
        "data": {
          "index": {
            "array": [
              2,
              1,
              0,
              3,
              2,
              0
            ],
            "type": "Uint32Array"
          },
          "groups": [],
          "attributes": {
            "position": {
              "array": [
                0.0155358529,
                -6.594257E-10,
                -0.004405262,
                0.0155358529,
                6.594257E-10,
                -0.0218739789,
                -0.0155358529,
                6.594257E-10,
                -0.0218739789,
                -0.0155358529,
                -6.594257E-10,
                -0.004405262
              ],
              "type": "Float32Array",
              "itemSize": 3
            },
            "normal": {
              "array": [
                0.0,
                -1.0,
                0.0,
                0.0,
                -1.0,
                0.0,
                0.0,
                -1.0,
                0.0,
                0.0,
                -1.0,
                0.0
              ],
              "type": "Float32Array",
              "itemSize": 3
            },
            "tangent": {
              "array": [
                -1.0,
                0.0,
                0.0,
                1.0,
                -1.0,
                0.0,
                0.0,
                1.0,
                -1.0,
                0.0,
                0.0,
                1.0,
                -1.0,
                0.0,
                0.0,
                1.0
              ],
              "type": "Float32Array",
              "itemSize": 4
            },
            "uv": {
              "array": [
                0.0,
                0.0,
                0.0,
                1.0,
                1.0,
                1.0,
                1.0,
                0.0
              ],
              "type": "Float32Array",
              "itemSize": 2
            }
          }
        }
      }
    ],
    "materials": [
      {
        "color": 16777215,
        "uuid": "8E40C3FC-E8D5-44FB-806D-7D23D38399DF",
        "type": "MeshBasicMaterial",
        "name": "stand_picture"
      },
      {
        "color": 16777215,
        "map": "D0BD8289-9FF8-46B7-BE87-9678DAB90718",
        "uuid": "4D811223-EE8E-4394-8F1A-FE3B29A5557F",
        "type": "MeshBasicMaterial",
        "name": "screen"
      },
      {
        "color": 16777215,
        "map": "11064EBC-2464-4824-BECC-39AD2FE2C772",
        "uuid": "3E9D0230-1B8D-44B8-94FB-79FAACBDC76A",
        "type": "MeshBasicMaterial",
        "name": "play_button",
        "transparent": true
      }
    ],
    "images": [
      {
        "uuid": "59CFEF78-0651-4EA4-9C0D-0BDE1D6B9357",
        "url": "maps/screen/video.jpg"
      },
      {
        "uuid": "CDE38C8D-5676-4DFD-9487-8D50F1D11355",
        "url": "maps/screen/play_button.png"
      }
    ],
    "textures": [
      {
        "uuid": "D0BD8289-9FF8-46B7-BE87-9678DAB90718",
        "name": "video",
        "image": "59CFEF78-0651-4EA4-9C0D-0BDE1D6B9357",
        "offset": [
          0.0,
          0.0
        ],
        "repeat": [
          1.0,
          1.0
        ],
        "wrap": [
          1000,
          1000
        ]
      },
      {
        "uuid": "11064EBC-2464-4824-BECC-39AD2FE2C772",
        "name": "play_button",
        "image": "CDE38C8D-5676-4DFD-9487-8D50F1D11355",
        "offset": [
          0.0,
          0.5
        ],
        "repeat": [
          1.0,
          0.5
        ],
        "wrap": [
          1000,
          1000
        ]
      }
    ],
    "animations": [],
    "object": {
      "uuid": "8A73E29F-668C-4592-A597-578CF53957A1",
      "name": "mobile_env",
      "type": "Scene",
      "children": [
        {
          "uuid": "C93E33BE-B720-4DBD-93C4-DBA7F3CA2D2C",
          "name": "slideshow",
          "matrix": [
            4.495263,
            0.0,
            -0.7112791,
            0.0,
            0.0,
            2.52874613,
            0.0,
            0.0,
            0.390131652,
            0.0,
            2.46562052,
            0.0,
            -1.86429071,
            1.44000053,
            -8.662549,
            1.0
          ],
          "children": [
            {
              "geometry": "CB467BDD-E193-4734-8420-6AEE37D65CC2",
              "material": "8E40C3FC-E8D5-44FB-806D-7D23D38399DF",
              "uuid": "3D771320-AA2F-48A0-80B3-9E8C358328FE",
              "name": "photo1",
              "type": "Mesh",
              "castShadow": true,
              "receiveShadow": true,
              "matrix": [
                1.0075,
                0.0,
                -3.002584E-08,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                2.98023224E-08,
                0.0,
                1.0,
                0.0,
                0.004,
                0.0,
                0.001,
                1.0
              ]
            },
            {
              "geometry": "CB467BDD-E193-4734-8420-6AEE37D65CC2",
              "material": "8E40C3FC-E8D5-44FB-806D-7D23D38399DF",
              "uuid": "46A0A2BF-FAFA-437A-8FB1-3B655101107C",
              "name": "photo2",
              "type": "Mesh",
              "castShadow": true,
              "receiveShadow": true,
              "matrix": [
                1.0075,
                0.0,
                -3.002584E-08,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                2.98023224E-08,
                0.0,
                1.0,
                0.0,
                0.004000021,
                0.0,
                0.0009998871,
                1.0
              ]
            },
            {
              "geometry": "CB467BDD-E193-4734-8420-6AEE37D65CC2",
              "material": "8E40C3FC-E8D5-44FB-806D-7D23D38399DF",
              "uuid": "B28A59DF-5DCD-4602-9F04-4350A5E7566A",
              "name": "photo3",
              "type": "Mesh",
              "castShadow": true,
              "receiveShadow": true,
              "matrix": [
                1.0075,
                0.0,
                -3.002584E-08,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                2.98023224E-08,
                0.0,
                1.0,
                0.0,
                0.00400006073,
                0.0,
                0.0009995054,
                1.0
              ]
            },
            {
              "geometry": "CB467BDD-E193-4734-8420-6AEE37D65CC2",
              "material": "8E40C3FC-E8D5-44FB-806D-7D23D38399DF",
              "uuid": "A837C44C-B7C6-44A8-B354-7F7E1B8F937F",
              "name": "photo4",
              "type": "Mesh",
              "castShadow": true,
              "receiveShadow": true,
              "matrix": [
                1.0075,
                0.0,
                -3.002584E-08,
                0.0,
                0.0,
                1.0,
                0.0,
                0.0,
                2.98023224E-08,
                0.0,
                1.0,
                0.0,
                0.00400008541,
                0.0,
                0.0009995226,
                1.0
              ]
            }
          ]
        },
        {
          "geometry": "7493B451-1B08-4005-9564-A42958444180",
          "material": "4D811223-EE8E-4394-8F1A-FE3B29A5557F",
          "uuid": "CBD702F9-B2B9-4D28-8325-912712ACEE7B",
          "name": "video",
          "type": "Mesh",
          "castShadow": true,
          "receiveShadow": true,
          "matrix": [
            23.9632435,
            -0.0497460626,
            -148.073563,
            0.0,
            148.073669,
            1.78814134E-05,
            23.963253,
            0.0,
            -0.00793487951,
            -150.0002,
            0.0491113178,
            0.0,
            9.651341,
            -0.14,
            0.7433236,
            1.0
          ],
          "children": [
            {
              "geometry": "CB467BDD-E193-4734-8420-6AEE37D65CC2",
              "material": "3E9D0230-1B8D-44B8-94FB-79FAACBDC76A",
              "uuid": "3F9019A8-FBA1-4683-BAB3-8AEBF3D7AC3C",
              "name": "play_button",
              "type": "Mesh",
              "castShadow": true,
              "receiveShadow": true,
              "matrix": [
                -0.005123911,
                -4.53700766E-09,
                1.36820781E-05,
                0.0,
                -1.36820745E-05,
                1.69868952E-06,
                -0.00512390863,
                0.0,
                0.0,
                -0.005123927,
                -1.69991119E-06,
                0.0,
                0.00038,
                -0.00018,
                -0.01329,
                1.0
              ]
            }
          ]
        }
      ]
    },
    "renderer": {
      "shadowMapEnabled": false
    }
  }