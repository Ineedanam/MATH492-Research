//Author: Yixuan Chen
export default class Graph{
    // N is 
    constructor(N, P){
        this.edges = new Array(N*N);
        this.n = N;
        this.p = P;
    }
    
    //getter
    edge(i,j) {
        // if (i<j)
        //     return Boolean(this.edges[i*(2*this.n-1-i)/2+j-i-1]);
        // else 
        //     return Boolean(this.edges[j*(2*this.n-1-j)/2+i-j-1]);//swap i and j
            return Boolean(this.edges[i*(this.n) + j])
    }
    
    //Method

    addEdge(i,j){
        // if (i<j)
        //     this.edges[i*(2*this.n-1-i)/2+j-i-1] = true;
        // else
        //     this.edges[j*(2*this.n-1-j)/2+i-j-1] = true;
            this.edges[i*(this.n) + j] = 1//edges length = n^2
            this.edges[j*(this.n) + i] = 1
    }

    removeEdge(i,j){
        // if (i<j)
        //     delete this.edges[i*(2*this.n-1-i)/2+j-i-1];
        // else
        //     delete this.edges[j*(2*this.n-1-j)/2+i-j-1];
        this.edges[i*(this.n) + j] = 0
        this.edges[j*(this.n) + i] =0
    }

    clearEdges(){
        this.edges = new Array(this.n*this.n);
    }

    randomizeEdges(){
        //give ((n 2) N) possible graphs, and random pick one
        //There are total (this.n-1)*(this.n)/2 possible edges when we have points n
        for (let i=0; i<this.n; i++)
           for (let j=i+1; j<this.n; j++)
                 if (Math.floor(Math.random()/(1-this.p)))
                     this.addEdge(i,j)
    }

    //this trace which other vertice connect to verticeX.
    // v is verticeX, a integer
    conComp(v){
        //distance = 0
        //use queue, index means the distance of vertices.
        let storeVer = []
        let storeIndex = []
        let L0 = 1
        storeVer = [v] //store vertices
        storeIndex = [0] //store index of vertices whose distance=0 
        
        //distance = 1
        //loop through all vertices, includes itself
        storeIndex.push(storeVer.length)
       // console.log(storeIndex)
       // let L1 = 0//number of points whose distance = 1
        let v0 = v//points we need to find neighbor
        for(let v1 = 0; v1<this.n; v1++){
            //loop all around to find connected neighbors
            if(this.edge(v0,v1) && (!storeVer.includes(v1))){
                storeVer.push(v1);
                //L1=L1+1;
            }               
        }
        

        let flag = true
        let loop = 0
        while(flag){
          loop += 1  
        //distance = 2
        //find distance=2 from distance = 1
        storeIndex.push(storeVer.length)
       
        let L2 = 0
        for(let l=storeIndex[loop]; l<storeVer.length; l++){
            let v1_ = storeVer[l]
            for(let v2 = 0; v2<this.n; v2++){
                if(this.edge(v1_,v2) && (!storeVer.includes(v2))){
                    storeVer.push(v2) 
                    L2++;
                }                   
            }
        }

        if(L2 == 0){
            flag = false
        }
        }    
       //console.log("storeIndex:" + storeIndex)
       //console.log("storeVertice:" +storeVer)
       return storeVer
    }


    
    //find how many components with given size in this graph
    //if the connected component repeated with vertice=1, and vertice=2. how should we do?
    subGraph(size){
       let sumSubGraph = 0;
       for(let i=0; i<this.n; i++){
           if (this.conComp(i).length == size & size !=1)
                sumSubGraph += 1/this.conComp(i).length;   
           else if(this.conComp(i).length == size & size == 1)
                sumSubGraph += 1

       }
       sumSubGraph = Math.round(sumSubGraph)
       return sumSubGraph;
    }

//G is the random Graph, H is the histogram which stored all sizes as an array
    countCompoundSizes(G, H){
        let size = 0;
        let checkV = new Array(this.n).fill(0);
        let arr = []
        let index = 0;
        //check vertices from point 0.
        // arr = this.conComp(0);
        // for (const v of arr){checkV[v] = 1}
        // size = arr.length;
        // H[size] ++;
        //check vertices from point v.
        while(checkV.indexOf(0) > -1){ 
            arr = this.conComp(index)
            for (const v of arr){checkV[v] = 1}
            size = arr.length;
            H[size]++;
            index = checkV.indexOf(0);

        }
    } 
}
