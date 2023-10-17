export type VertexType = {
    id: number;
    name: string;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export type GraphFromObjectType = {
    type: 'direction' | 'nonDirection', vertexList: Map<number, VertexType>, edgesList: Object, weightType: boolean
}


export type EdgeType = { vertex: number, weight: number | null }

export class Graph {
    edgesList: Map<number, Set<EdgeType>>;
    type: 'direction' | 'nonDirection';
    weightType: boolean;
    vertexList: Map<number, VertexType>
    usedListForBFS: Map<number, boolean>;
    comp: Array<number>
    edgesListForDeikstra = new Map<number, Set<EdgeType>>()


    // конструктор пустой
    constructor(
        type?: 'direction' | 'nonDirection',
        edgesList?: Map<number, Set<EdgeType>>,
        vertexList?: Map<number, VertexType>,
        weightType?: boolean
    ) {
        this.edgesList = edgesList ?? new Map<number, Set<EdgeType>>()
        this.vertexList = vertexList ?? new Map<number, VertexType>()
        this.type = type ?? 'nonDirection'
        this.weightType = weightType ?? false;
        this.usedListForBFS = new Map<number, boolean>()
        this.comp = []
    }

    createFromFile(obj: GraphFromObjectType) {
        let newEdges = new Map<number, Set<EdgeType>>()// @ts-ignore
        const keys = Object.keys(obj.edgesList)
        keys.forEach(key => {
            // @ts-ignore
            const newArr: Array<EdgeType> = JSON.parse(obj.edgesList[key]);
            const newSet = new Set<EdgeType>()
            newArr.forEach(el => newSet.add(el))
            newEdges.set(Number(key), newSet)
        })

        const newVertexes = new Map<number, VertexType>()
        keys.forEach(key => {
            // @ts-ignore
            newVertexes.set(Number(key), obj.vertexList[key])
        })
        return new Graph(obj.type, newEdges, newVertexes, obj.weightType)
    }

    getWeightType() {
        return this.weightType;
    }

    getUniqValue(vertexFromGraph1: Map<number, VertexType>, newVertex: VertexType) {
        let isUniq = true;
        vertexFromGraph1.forEach(el => {
            if (el.name === newVertex.name) {
                isUniq = false
            }
        })
        if (!isUniq) {
            return false
        }
        return {id: newVertex.id + 100, name: newVertex.name}
    }


    // createFromUnion(graph1: GraphFromObjectType, graph2: GraphFromObjectType) {
    //     if (graph1.type === 'direction' || graph2.type === 'direction') {
    //         return alert('Графы должны быть ориентированные')
    //     } else {
    //         let newEdgesGraph1 = new Map<number, Set<number>>()// @ts-ignore
    //         let newEdgesGraph2 = new Map<number, Set<number>>()// @ts-ignore
    //         const keysGraph1 = Object.keys(graph1.edgesList)
    //         const keysGraph2 = Object.keys(graph2.edgesList)
    //         const duplicates = [] as Array<number>
    //
    //
    //         const newVertexesGraph1 = new Map<number, VertexType>()
    //         keysGraph1.forEach(key => {
    //             // @ts-ignore
    //             newVertexesGraph1.set(Number(key), graph1.vertexList[key])
    //         })
    //
    //         const newVertexesGraph2 = new Map<number, VertexType>()
    //         keysGraph2.forEach(key => {
    //             // @ts-ignore
    //             const temp = this.getUniqValue(newVertexesGraph1, graph2.vertexList[key])
    //             // @ts-ignore
    //             if (temp) {
    //                 newVertexesGraph2.set(Number(key) + 100, temp)
    //             } else {
    //                 duplicates.push(Number(key) + 100)
    //
    //             }
    //         })
    //
    //         keysGraph1.forEach(key => {
    //             // @ts-ignore
    //             const newArr: Array<number> = JSON.parse(graph1.edgesList[key]);
    //             const newSet = new Set<number>()
    //             newArr.forEach(el => newSet.add(el))
    //             newEdgesGraph1.set(Number(key), newSet)
    //         })
    //
    //         keysGraph2.forEach(key => {
    //             debugger
    //             // @ts-ignore
    //             const temp = this.getUniqValue(newVertexesGraph1, graph2.vertexList[key])
    //             if (temp) {
    //                 // @ts-ignore
    //                 const newArr: Array<number> = JSON.parse(graph2.edgesList[key]);
    //                 const newSet = new Set<number>()
    //                 newArr.forEach(el => newSet.add(el + 100))
    //                 newEdgesGraph2.set(Number(key) + 100, newSet)
    //             }
    //
    //         })
    //
    //
    //         newVertexesGraph2.forEach((el, key) => {
    //             newVertexesGraph1.set(key, el)
    //             newEdgesGraph1.forEach(el => {
    //                 el.add(key)
    //             })
    //         })
    //         newEdgesGraph2.forEach((el, key) => {
    //             debugger
    //             const newSet = new Set<number>(el)
    //             keysGraph1.forEach(t => {
    //                 newSet.add(Number(t))
    //             })
    //             newEdgesGraph1.set(key, newSet)
    //         })
    //         newEdgesGraph1.forEach(el => {
    //             duplicates.forEach(dup => {
    //                 el.delete(dup)
    //
    //             })
    //         })
    //         return new Graph('nonDirection', newEdgesGraph1, newVertexesGraph1)
    //
    //     }
    // }

    addVertex(newVertex: VertexType) {
        this.vertexList.set(newVertex.id, newVertex)
        this.edgesList.set(newVertex.id, new Set<EdgeType>())
    }

    addEdge(edge: { from: number, to: number, weight: number | null }) {
        if (this.vertexList.has(edge.from) && this.vertexList.has(edge.to)) {
            const currentSet = this.edgesList.get(edge.from)
            if (currentSet)
                this.edgesList.set(edge.from, currentSet.add({vertex: edge.to, weight: edge.weight}))

            if (this.type === 'nonDirection') {
                const currentSet = this.edgesList.get(edge.to)
                if (currentSet)
                    this.edgesList.set(edge.to, currentSet.add({vertex: edge.from, weight: edge.weight}))
            }

        } else {
            alert('Такого ребра/ребер не существует')
        }
    }

    deleteVertex(vertexId: number) {
        this.vertexList.delete(vertexId)
        this.edgesList.delete(vertexId)
        this.edgesList.forEach(edge => {
            edge.forEach(el => {
                if (el.vertex === vertexId) {
                    edge.delete(el)
                }
            })
        })
    }

    deleteEdge(edge: { from: number, to: number, weight: number | null }) {
        if (this.vertexList.has(edge.from) && this.vertexList.has(edge.to)) {
            const currentSet = this.edgesList.get(edge.from)
            if (currentSet) {
                currentSet.forEach(el => {
                    if (el.vertex === edge.to && el.weight === edge.weight) {
                        currentSet.delete(el)
                    }
                })
                this.edgesList.set(edge.from, currentSet)
            }
            if (this.type === 'nonDirection') {
                const currentSet = this.edgesList.get(edge.to)
                if (currentSet) {
                    currentSet.forEach(el => {
                        if (el.vertex === edge.from && el.weight === edge.weight) {
                            currentSet.delete(el)
                        }
                    })
                    this.edgesList.set(edge.to, currentSet)
                }
            }

        } else {
            alert('Такого ребра/ребер не существует')

        }
    }

    changeWeightType(type: boolean) {
        if (this.weightType && type) {
            return
        }
        if (!this.weightType && !type) {
            return;
        }
        if (this.weightType && !type) {
            this.weightType = type;
            this.edgesList.forEach(el => {
                el.forEach(edge => {
                    return {
                        vertex: edge.vertex,
                        weight: null,
                    }
                })
            })
            return;
        }
        if (!this.weightType && type) {
            this.weightType = type;
            this.edgesList.forEach(el => {
                el.forEach(edge => {
                    return {
                        vertex: edge.vertex,
                        weight: 0,
                    }
                })
            })
        }
    }

    changeType(type: 'direction' | 'nonDirection') {
        if (this.type === 'direction' && type === "direction") {
            this.type = type
            return
        }
        if (this.type === 'nonDirection' && type === 'nonDirection') {
            this.type = type
            return;
        }

        if (this.type === 'direction' && type === 'nonDirection') {
            this.type = type
            this.vertexList.forEach(el => {
                const smeznVertex = this.edgesList.get(el.id)
                if (smeznVertex) {
                    smeznVertex.forEach(value => {
                        this.addEdge({from: value.vertex, to: el.id, weight: 0})
                    })
                }
            })
            return;
        }
        this.type = type

    }

    getVertexName(vertexId: number) {
        const result = this.vertexList.get(vertexId);
        if (result) {
            return result.name
        }
        return String(vertexId)
    }

    getVertex() {
        return this.vertexList
    }

    getEdges() {
        return this.edgesList
    }

    exportToFile() {
        let edgesListObj: any = {};
        this.edgesList.forEach((value, key) => {
            edgesListObj[String(key)] = JSON.stringify(Array.from(value));
        })
        const grafObject = {
            type: this.type,
            weightType: this.weightType,
            vertexList: Object.fromEntries(this.vertexList),
            edgesList: edgesListObj
        }

        const blob = new Blob([JSON.stringify(grafObject, null, 2)], {type: "application/json;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const elem = document.createElement("a");
        elem.href = url;
        elem.download = 'graf.json';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
        return
    }

    getExitingVertexes(vertexId: number) {
        if (this.type === 'nonDirection') {
            alert('Граф неориентированный')
        } else {
            const findedItem = this.edgesList.get(vertexId)?.values()
            return findedItem ? Array.from(findedItem) : null
        }

    }

    getHalfExodus(vertexId: number) {
        const findedItem = this.edgesList.get(vertexId)?.values()
        return findedItem ? Array.from(findedItem).length : -1
    }

    getHalfApproach(vertexId: number) {
        if (this.type === 'direction') {
            let result = 0
            this.edgesList.forEach(el => {
                el.forEach(edge => {
                    if (edge.vertex === vertexId) {
                        result += 1
                    }
                })
            })
            return result
        } else {
            alert('Граф неориетированный!')
        }

    }

    getDegreesForAllVertexes() {
        let res = [] as Array<{ name: string, id: number, count: number }>
        this.vertexList.forEach(el => {
            const count = this.getHalfExodus(el.id)
            res.push({name: el.name, id: el.id, count: count})
        })
        return res
    }

    // Вывести все висячие вершины графа (степени 1).
    getHandingVetexes() {
        let res = [] as Array<{ name: string, id: number }>
        this.vertexList.forEach(el => {
            const exitingCount = this.getHalfExodus(el.id)
            if (exitingCount && exitingCount === 1) {
                res.push({name: el.name, id: el.id})
            }
        })
        return res
    }


    // Вывести все изолированные вершины орграфа (степени 0)
    getIsolatedVetexes() {
        let res = [] as Array<{ name: string, id: number }>
        this.vertexList.forEach(el => {
            const exitingCount = this.getHalfExodus(el.id)
            const comingCount = this.getHalfApproach(el.id)
            if (exitingCount && exitingCount === 0 && comingCount === 0) {
                res.push({name: el.name, id: el.id})
            }
        })

        return res
    }

    // Вывести те вершины, у которых полустепень исхода больше полустепени захода.
    getVertexesExodusMoreApproach() {
        let res = [] as Array<{ name: string, id: number }>
        this.vertexList.forEach(el => {
            const exitingCount = this.getHalfExodus(el.id)
            const comingCount = this.getHalfApproach(el.id)
            if (exitingCount && comingCount && (exitingCount > comingCount)) {
                res.push({name: el.name, id: el.id})
            }
        })
        return res
    }

    // Вывести те вершины, полустепень исхода которых больше, чем у заданной вершины.
    getVertexesExodusMoreCurrentVertex(vertexId: number) {
        const currentVertexExodus = this.getHalfExodus(vertexId);
        let res = [] as Array<{ name: string, id: number }>
        this.vertexList.forEach(el => {
            if (el.id !== vertexId) {
                const currExodus = this.getHalfExodus(el.id)
                if (currExodus > currentVertexExodus) {
                    res.push({name: el.name, id: el.id})

                }
            }
        })
        return res
    }

    //10 Вывести те вершины, полустепень захода которых меньше, чем у заданной вершины.
    getVertexesApproachLessCurrentVertex(vertexId: number) {
        const currentVertexApproach = this.getHalfApproach(vertexId)
        if (currentVertexApproach) {
            let res = [] as Array<{ name: string, id: number }>
            this.vertexList.forEach(el => {
                if (el.id !== vertexId) {
                    const currApproach = this.getHalfApproach(el.id)
                    if (currApproach && currApproach < currentVertexApproach) {
                        res.push({name: el.name, id: el.id})

                    }
                }
            })
            return res
        }
    }

    getSmeznVertexes(vertexId: number) {
        if (this.type === 'direction') {
            let res = [] as Array<VertexType>
            const edges = this.edgesList.get(vertexId)
            if (edges) {
                edges.forEach(el => {
                    const vertex = this.vertexList.get(el.vertex)
                    if (vertex) {
                        res.push(vertex)
                    }
                })
            }
            return res
        } else {
            alert('Граф неориентированный!')
        }
    }

    dfs(vertexId: number) {
        this.usedListForBFS.set(vertexId, true);
        this.comp.push(vertexId);
        const edge = this.edgesList.get(vertexId);
        edge?.forEach(el => {
            if (!this.usedListForBFS.get(el.vertex))
                this.dfs(el.vertex)
        })

    }

    // все связные компоненты графа
    findComposes() {
        const result: Array<Array<number>> = []
        this.usedListForBFS = new Map<number, boolean>()
        this.vertexList.forEach(el => {
            this.usedListForBFS.set(el.id, false)
        })

        this.vertexList.forEach(el => {
            if (!this.usedListForBFS.get(el.id)) {
                this.comp = []
                this.dfs(el.id)
                result.push(this.comp)
            }
        })

        console.log(result)
        return result;

    }



    // deikstra
    getShortestPaths(startVertexId: number, additionalData?:{maxWeight: number, from: number, to: number}) {
        if (!additionalData) {
            this.getEdgesForDeikstra()
        }
        else{
            this.edgesListForDeikstra = this.edgesList
        }
        const shortestPath = new Map<number, number>();
        // @ts-ignore
        for (const [vertex, _] of this.vertexList) {
            shortestPath.set(vertex, Number.MAX_SAFE_INTEGER);
        }
        shortestPath.set(startVertexId, 0);

        const visited = new Set();
        for (let i = 0; i < this.vertexList.size - 1; i++) {
            const minVertex = this.getMinDistance(shortestPath, visited);
            visited.add(minVertex);

            // @ts-ignore
            for (const { vertex, weight } of this.edgesListForDeikstra.get(minVertex)) {
                // @ts-ignore
                if (!visited.has(vertex) && weight !== null && shortestPath.get(minVertex) + weight < shortestPath.get(vertex)) {
                    shortestPath.set(vertex, shortestPath.get(minVertex) + weight);
                }
            }
        }

        return shortestPath;


    }

    getEdgesForDeikstra() {
        const newEdgesList = new Map<number, Set<EdgeType>>()
        this.edgesList.forEach((el, key) => {
            const newSet = new Set<EdgeType>()
            el.forEach(edge => {
                newSet.add({vertex: edge.vertex, weight: 1})
            })
            newEdgesList.set(key, newSet)
        })
        this.edgesListForDeikstra = newEdgesList
    }

    // @ts-ignore
    private getMinDistance(shortestPath: Map, visited) {
        let minDistance = Number.MAX_SAFE_INTEGER;
        let minVertex = -1;
        for (const [vertex, distance] of shortestPath) {
            if (!visited.has(vertex) && distance <= minDistance) {
                minDistance = distance;
                minVertex = vertex;
            }
        }
        return minVertex;
    }


    // каркас
    getKruskalMST(){
        const result: Array<{ source: number; destination: number; weight: number }> = [];
        const edgeList: Array<{ source: number; destination: number; weight: number }> = [];

        // Преобразование Map в плоский массив рёбер
        // @ts-ignore
        for (const [source, destinations] of this.edgesList) {
            for (const { vertex, weight } of destinations) {
                edgeList.push({ source, destination: vertex, weight: weight || 0 });
            }
        }

        // Сортировка рёбер по весу
        edgeList.sort((a, b) => a.weight - b.weight);


        const parent: Map<number, number> = new Map();

        const find = (i: number): number => {
            if (!parent.has(i)) {
                return i;
            }
            if (parent.get(i) === i) {
                return i;
            }
            return find(parent.get(i)!);
        };

        const union = (x: number, y: number) => {
            parent.set(x, y);
        };

        // @ts-ignore
        for (const vertex of this.vertexList.keys()) {
            parent.set(vertex, vertex);
        }

        for (const edge of edgeList) {
            const rootSource = find(edge.source);
            const rootDestination = find(edge.destination);

            if (rootSource !== rootDestination) {
                result.push(edge);
                union(rootSource, rootDestination);
            }
        }

        return result;
    }





}