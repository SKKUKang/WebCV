const BLOCKS = {

  tree: [
    [[2, 1], [0, 1], [1, 0], [1, 1]],//ㅗ
    [[1, 2], [0, 1], [1, 0], [1, 1]],//ㅓ
    [[1, 2], [0, 1], [2, 1], [1, 1]],//ㅜ
    [[2, 1], [1, 2], [1, 0], [1, 1]]//ㅏ
  ],

  square: [
    [[1, 0], [1, 1], [2, 0], [2, 1]],
    [[1, 0], [1, 1], [2, 0], [2, 1]],
    [[1, 0], [1, 1], [2, 0], [2, 1]],
    [[1, 0], [1, 1], [2, 0], [2, 1]]


  ],
  bar: [
    [[0, 0], [1, 0], [2, 0], [3, 0]],//ㅡ
    [[2, -1], [2, 0], [2, 1], [2, 2]],//ㅣ
    [[0, 0], [1, 0], [2, 0], [3, 0]],//ㅡ
    [[2, -1], [2, 0], [2, 1], [2, 2]]//ㅣ

  ],
  zee: [
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    // ㅁ ㅁ
    //    ㅁ ㅁ
    [[0, 1], [1, 0], [1, 1], [0, 2]],
    //   ㅁ
    //ㅁ ㅁ
    //ㅁ
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    //ㅁ ㅁ
    //   ㅁ ㅁ
    [[0, 1], [1, 0], [1, 1], [0, 2]]
    //   ㅁ
    //ㅁ ㅁ
    //ㅁ

  ],
  see: [
    [[0, 1], [1, 0], [1, 1], [2, 0]],
    //   ㅁ ㅁ
    //ㅁ ㅁ
    [[0, 0], [0, 1], [1, 1], [1, 2]],
    // ㅁ
    // ㅁ ㅁ
    //    ㅁ
    [[0, 1], [1, 0], [1, 1], [2, 0]],
    //   ㅁ ㅁ
    //ㅁ ㅁ
    [[0, 0], [0, 1], [1, 1], [1, 2]]
    // ㅁ
    // ㅁ ㅁ
    //    ㅁ
  ],
  elLeft: [
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    //ㅁ
    //ㅁ ㅁ ㅁ
    [[1, 0], [1, 1], [1, 2], [0, 2]],
    //   ㅁ 
    //   ㅁ
    //ㅁ ㅁ
    [[0, 1], [1, 1], [2, 1], [2, 2]],
    //ㅁ ㅁ ㅁ
    //     ㅁ
    [[1, 0], [2, 0], [1, 1], [1, 2]]
    //   ㅁ  ㅁ
    //   ㅁ
    //   ㅁ
  ],
  elRight: [
    [[0, 1], [1, 1], [2, 1], [2, 0]],
    //      ㅁ
    // ㅁ ㅁ ㅁ
    [[0, 0], [1, 0], [1, 1], [1, 2]],
    // ㅁ ㅁ
    //    ㅁ
    //    ㅁ
    [[0, 1], [1, 1], [2, 1], [0, 2]],
    // ㅁ ㅁ ㅁ 
    // ㅁ
    [[1, 0], [1, 1], [1, 2], [2, 2]]
    //    ㅁ
    //    ㅁ
    //    ㅁ ㅁ
  ]
}




export default BLOCKS;


