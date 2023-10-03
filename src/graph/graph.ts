export type VertexType = {
    id: number;
    name: string;
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

    createFromFile(obj: {
        type: 'direction' | 'nonDirection', vertexList: Map<number, VertexType>, edgesList: Object
    }) {
        let newEdges = new Map<number, Set<number>>()
        console.log(obj)
        // @ts-ignore
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
        const findedItem = this.edgesList.get(vertexId)?.values()
        return findedItem ? Array.from(findedItem) : null
    }

    getHalfExodus(vertexId: number) {
        const findedItem = this.edgesList.get(vertexId)?.values()
        return findedItem ? Array.from(findedItem).length : -1
    }

    getDegreesForAllVertexes() {
        let res = [] as Array<{ name: string, id: number, count: number }>
        this.vertexList.forEach(el => {
            const count = this.getHalfExodus(el.id)
            res.push({name: el.name, id: el.id, count: count})
        })
        return res
    }

}