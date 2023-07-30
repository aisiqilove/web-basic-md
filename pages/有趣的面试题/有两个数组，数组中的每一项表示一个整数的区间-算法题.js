// 有两个数组，数组中的每一项表示一个整数的区间，

// banList 表示这些数字是禁止使用的，useList表示需要使用的数组

// 求最终可以使用的数字区间是什么？
const banList = [[1, 5], [8, 12], [20, 26]]

const useList = [[2, 9], [11, 14], [18, 30]]

/**
可以使用的数字区间是banList和useList的差集。具体来说，需要对每个区间进行处理，找出最终可以使用的区间。

对于banList中的每一个区间[bStart, bEnd]，需要从useList中去掉完全包含在该区间内的区间。如果useList中的某个区间[uStart, uEnd]完全包含在[bStart, bEnd]内，则移除[uStart, uEnd]。

对于useList中的每一个区间[uStart, uEnd]，需要将与banList中的任何一个区间重叠的部分去掉。如果banList中的某个区间[bStart, bEnd]与[uStart, uEnd]有重叠，

则将[uStart, uEnd]分成三段：[uStart, bStart-1]、[bEnd+1, uEnd]和[bStart, bEnd]。将不与banList重叠的两段保留下来，将与banList重叠的那一段丢弃。

处理完以上两步之后，剩下的useList中的区间即为最终可以使用的数字区间。

 **/

function getAvailableRange(banList, useList) {
    const banListLen = banList.length;
    const useListLen = useList.length;
    const res = [];

    for (let i = 0; i < banListLen; i++) {
        const [bStart, bEnd] = banList[i];
        for (let j = 0; j < useListLen; j++) {
            const [uStart, uEnd] = useList[j];
            if (uStart > bEnd || uEnd < bStart) {
                continue;
            } else if (uStart >= bStart && uEnd <= bEnd) {
                useList.splice(j, 1);
                j--;
            } else if (uStart < bStart && uEnd > bEnd) {
                useList.push([uStart, bStart - 1]);
                useList.push([bEnd + 1, uEnd]);
                useList.splice(j, 1);
                j--;
            } else if (uStart < bStart) {
                useList[j][1] = bStart - 1;
            } else if (uEnd > bEnd) {
                useList[j][0] = bEnd + 1;
            }
        }
    }

    return useList;
}

console.log(getAvailableRange(banList, useList));