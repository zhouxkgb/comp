
// 把model裁剪出需要的值
function getPreModel (target, model) {
  const nIdxs = Array.from(target.matchAll('\n'), v => v.index)
}


export function getDiffIndex (s1, s2) {
  let len1 = s1.length
  let len2 = s2.length
  if (len1 > len2) {
    for (let i = 0; i < len1; i++) {
      if (s1[i] !== s2[i]) {
        return [s1, i, s1.substr(i, len1 - len2)]
      }
    }
  } else {
    for (let i = 0; i < len2; i++) {
      if (s1[i] !== s2[i]) {
        return [s2, i, s2.substr(i, len2 - len1)]
      }
    }
  }
  return []
}
const MODEL = ['#', '&', '$']
// 自增模型
export function getIncModel (len, preVal, nexVal) {
  const MODEL = ['#', '&', '$']
  const LEN = MODEL.length
  let incModel = []

  if (len === 1) {
    let one = oneModel(preVal, nexVal)
    if (one !== '') {
      incModel.push(one)
    }
  } else {
    let preIndex = MODEL.indexOf(preVal)
    for (let i = len; i > 0; i--) {
      if (i !== 1) {
        preIndex += 1
        incModel.push(MODEL[preIndex % LEN])
      } else {
        incModel.push(oneModel(MODEL[preIndex % LEN], nexVal))
      }
    }
  }
  return incModel
}

export function oneModel (preVal, nextVal) {
  const MODEL = ['#', '&', '$']
  const LEN = MODEL.length
  let nextIdex = MODEL.indexOf(nextVal)
  let preIndex = MODEL.indexOf(preVal)
  if (nextIdex !== -1 && preIndex !== -1) {
    return nextIdex === preIndex ? MODEL[(preIndex + 1) % LEN] : MODEL[3 - nextIdex - preIndex]
  } else if (preIndex === -1) {
    return MODEL[(nextIdex + 1) % LEN]
  } else if (nextIdex === -1) {
    return MODEL[(preIndex + 1) % LEN]
  }
  return '#'
}



/**
 * 非复制操作
 * 加内容：
 *  如果字符前是\n则在对应位置加1个模型 [前后一致模型一致，前后不一致模型不一致]
 *  如果字符是\n则模型在对应位置也要加\n 要判断是否连续加\n ？
 * 删内容：
 *  如果字符前是\n则在对应位置删模型
 *  如果字符是\n则在模型对应位置也要删\n
 * 
 * 复制操作
 * 加内容：
 *  如果字符前是\n则在对应位置加k个模型[k=\n的数量,前后一致模型一致，前后不一致模型不一致]
 *  如果字符前不是\n则在对应位置加
 * 删内容： 

 * @param {*} seq 
 * @param {*} val 
 * @param {*} curValue 
 * @param {*} diff 
 * @returns 
 */
export function calcModel (seq, val, curValue) {
  let newSeq = ''
  let oldLen = val.length
  let newLen = curValue.length
  const curArr = curValue.split('\n')
  const seqArr = seq.split('\n')
  const [str, diffIndex, diffStr] = getDiffIndex(curValue, val)
  if (diffStr.length === 1) { // 非复制
    if (oldLen < newLen) { // 加
      // 找对应位置
    } else {  // 减

    }
    return newSeq
  }
  // 复制操作

  return newSeq
}

// 内容变化
function handChange (e) {
  let curValue = e.target.value
  let { seq, data } = this.state
  let seqArr = seq.split('\n').filter(Boolean)
  let [str, diffIndex, diffStr] = getDiffIndex(curValue, data)
  let diff = diffStr.split('\n').filter(Boolean).length
  let pre = str.substr(0, diffIndex).split('\n').filter(Boolean).length
  let newSeq = ''

  // 加内容
  // if (str === curValue) {
  //   // 无模型
  //   if (seq === '') {
  //     newSeq = getIncModel(diff || 1).join('\n')
  //   }else

  //   // 输入\n
  //   if (diffStr === '\n') {
  //     if (data[diffIndex - 1] === '\n') { // 连续两个\n不允许
  //       return
  //     } else {
  //       newSeq = seq.slice(0, diffIndex) + '\n' + seq.slice(diffIndex) // 模型在对应位置加\n
  //     }
  //   }

  //   // 有模型
  //   else {



  //     if (seqArr[pre - 1] === seqArr[pre]) { // 前后相同，中间相同
  //       seqArr.splice(pre, 0, ...new Array(diff || 1).fill(seqArr[pre]))
  //       newSeq = seqArr.join('\n')
  //       curValue = curValue !== '\n' ? curValue.trim() : curValue
  //     } else { // 前后不同，顺序插入
  //       let add = 1  // 没有换行
  //       if (diff !== 0) {    // 有换行
  //         add = seq[seq.length - 1] === '\n' ? diff : diff - 1
  //         let tmp = getIncModel(add, seqArr[pre - 1], seqArr[pre])
  //         seqArr.splice(pre, 0, ...tmp)
  //         curValue = curValue !== '\n' ? curValue.trim() : curValue
  //       } else { // 回车
  //         seqArr.splice(pre, 0, '\n')
  //       }
  //       newSeq = seqArr.join('\n')
  //     }
  //   }
  // } else { // 减内容
  //   if (str[diffIndex - 1] === '\n') {  // 当前行最后一个字符时要删除对应模型
  //     if (diffStr.indexOf('\n') === -1) { // 没有换行符计算模型
  //       newSeq = seq.substr(0, seq.length - 1)
  //     } else {  // 有换行符计算模型
  //       newSeq = [...seqArr.slice(0, pre), ...seqArr.slice(pre + diff)].join('\n') + '\n'
  //     }
  //   } else {  // 当没有删到最后一个字符时
  //     if (diffStr.indexOf('\n') === -1) { // 没有换行符计算模型
  //       newSeq = seq
  //     } else {  // 有换行符计算模型
  //       newSeq = [...seqArr.slice(0, pre), ...seqArr.slice(pre + diff)].join('\n')
  //     }
  //   }
  // }
  this.setState({
    data: curValue,
    seq: newSeq
  })
}
