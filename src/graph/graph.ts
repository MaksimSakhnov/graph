export type VertexType = {
    id: number;
    name: string;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export type GraphFromObjectType = {
    type: 'direction' | 'nonDirection', vertexList: Map<number, VertexType>, edgesList: Object
}


export class Graph {
    edgesList: Map<number, Set<number>>;
    type: 'direction' | 'nonDirection';
    vertexList: Map<number, VertexType>

    // конструктор пустой
    constructor(type?: 'direction' | 'nonDirection', edgesList?: Map<number, Set<number>>, vertexList?: Map<number, VertexType>) {
        this.edgesList = edgesList ?? new Map<number, Set<number>>()
        this.vertexList = vertexList ?? new Map<number, VertexType>()
        this.type = type ?? 'nonDirection'
    }

    createFromFile(obj: GraphFromObjectType) {
        let newEdges = new Map<number, Set<number>>()// @ts-ignore
        const keys = Object.keys(obj.edgesList)
        keys.forEach(key => {
            // @ts-ignore
            const newArr: Array<number> = JSON.parse(obj.edgesList[key]);
            const newSet = new Set<number>()
            newArr.forEach(el => newSet.add(el))
            newEdges.set(Number(key), newSet)
        })

        const newVertexes = new Map<number, VertexType>()
        keys.forEach(key => {
            // @ts-ignore
            newVertexes.set(Number(key), obj.vertexList[key])
        })
        return new Graph(obj.type, newEdges, newVertexes)
    }

    getUniqValue(vertexFromGraph1: Map<number, VertexType>, newVertex: VertexType) {
        let isUniq = true;
        vertexFromGraph1.forEach(el=>{
            if(el.name === newVertex.name){
                isUniq = false
            }
        })
        if(!isUniq){
            const rnd = getRandomInt(100)
            return {id: newVertex.id + 100, name: newVertex.name + rnd}
        }
        return {id: newVertex.id + 100, name: newVertex.name}
    }


    createFromUnion(graph1: GraphFromObjectType, graph2: GraphFromObjectType) {
        if (graph1.type === 'direction' || graph2.type === 'direction') {
            return alert('Графы должны быть ориентированные')
        } else {
            let newEdgesGraph1 = new Map<number, Set<number>>()// @ts-ignore
            let newEdgesGraph2 = new Map<number, Set<number>>()// @ts-ignore
            const keysGraph1 = Object.keys(graph1.edgesList)
            const keysGraph2 = Object.keys(graph2.edgesList)
            keysGraph1.forEach(key => {
                // @ts-ignore
                const newArr: Array<number> = JSON.parse(graph1.edgesList[key]);
                const newSet = new Set<number>()
                newArr.forEach(el => newSet.add(el))
                newEdgesGraph1.set(Number(key), newSet)
            })

            keysGraph2.forEach(key => {
                // @ts-ignore
                const newArr: Array<number> = JSON.parse(graph2.edgesList[key]);
                const newSet = new Set<number>()
                newArr.forEach(el => newSet.add(el + 100))
                newEdgesGraph2.set(Number(key) + 100, newSet)
            })

            const newVertexesGraph1 = new Map<number, VertexType>()
            keysGraph1.forEach(key => {
                // @ts-ignore
                newVertexesGraph1.set(Number(key), graph1.vertexList[key])
            })

            const newVertexesGraph2 = new Map<number, VertexType>()
            keysGraph2.forEach(key => {
                // @ts-ignore
                newVertexesGraph2.set(Number(key) + 100, this.getUniqValue(newVertexesGraph1, graph2.vertexList[key]))
            })

            newVertexesGraph2.forEach((el,key)=>{
                newVertexesGraph1.set(key, el)
                newEdgesGraph1.forEach(el=>{
                    el.add(key)
                })
            })
            newEdgesGraph2.forEach((el, key)=>{
                debugger
                const newSet = new Set<number>(el)
                keysGraph1.forEach(t=>{
                    newSet.add(Number(t))
                })
                newEdgesGraph1.set(key, newSet)
            })
            return new Graph('nonDirection', newEdgesGraph1, newVertexesGraph1)

        }
    }

    addVertex(newVertex: VertexType) {
        this.vertexList.set(newVertex.id, newVertex)
        this.edgesList.set(newVertex.id, new Set<number>())
    }

    addEdge(edge: { from: number, to: number }) {
        if (this.vertexList.has(edge.from) && this.vertexList.has(edge.to)) {
            const currentSet = this.edgesList.get(edge.from)
            if (currentSet)
                this.edgesList.set(edge.from, currentSet.add(edge.to))

            if (this.type === 'nonDirection') {
                const currentSet = this.edgesList.get(edge.to)
                if (currentSet)
                    this.edgesList.set(edge.to, currentSet.add(edge.from))
            }

        } else {
            alert('Такого ребра/ребер не существует')
        }
    }

    deleteVertex(vertexId: number) {
        this.vertexList.delete(vertexId)
        this.edgesList.delete(vertexId)
        this.edgesList.forEach(edge => {
            edge.delete(vertexId)
        })
    }

    deleteEdge(edge: { from: number, to: number }) {
        if (this.vertexList.has(edge.from) && this.vertexList.has(edge.to)) {
            const currentSet = this.edgesList.get(edge.from)
            if (currentSet) {
                currentSet.delete(edge.to)
                this.edgesList.set(edge.from, currentSet)
            }
            if (this.type === 'nonDirection') {
                const currentSet = this.edgesList.get(edge.to)
                if (currentSet) {
                    currentSet.delete(edge.from)
                    this.edgesList.set(edge.to, currentSet)
                }
            }

        } else {
            alert('Такого ребра/ребер не существует')

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
                        this.addEdge({from: value, to: el.id})
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
                if (el.has(vertexId)) {
                    result += 1
                }
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
                    const vertex = this.vertexList.get(el)
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


}