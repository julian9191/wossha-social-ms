

import oracledb = require("oracledb");
import { ResultSetMapper } from "./result.set.mapper";
import { ParamSet } from "./param.set";

export class BaseDao {

    private testConfig = {
        user          : process.env.DB_USERNAME,
        password      : process.env.DB_PASSWORD,
        connectString : process.env.DB_CONNECT_STRING,
        externalAuth  : false
    };

    private connection: oracledb.Connection = null;

    private async connectionDB(): Promise<oracledb.Connection> {
        let connection: oracledb.Connection = null;
        try {
            console.log("#### Start connection to the db");
            connection = await oracledb.getConnection(this.testConfig);
            console.log('Connection to the db was successful!');

            } catch (err) {
            console.error("#### There where an error trying to connect to the db");
        }
        return connection;
    }

    private async getConnection(){
        if(!this.connection){
            this.connection = await this.connectionDB();
        }
    }

    protected async executeQuery<T>(query: string, paramSet: any, mapper: ResultSetMapper<T>) : Promise<T[]>{
        if(!this.connection){
            await this.getConnection();
        }
        let params = this.getParamsOrderFromParamsSet(query, paramSet);
        return await this.executeQueryStatement(query, params, mapper);
    }

    protected async execute(query: string, paramSet: any) : Promise<boolean>{
        if(!this.connection){
            await this.getConnection();
        }
        let params = this.getParamsOrderFromParamsSet(query, paramSet);
        return await this.executeUpdateStatement(query, params);
    }

    private getParamsOrderFromParamsSet(query: string, paramSet: ParamSet): string[]{
        let params:string[] = [];
        
        let bindNames = query.match(/(:[a-z])\w+/g).map(item => {
            return item.substring(1, item.length);
        });

        if(bindNames && paramSet.paramNames.length>0){
            for (let i = 0; i < bindNames.length; i++) {
                let found = false;
                for (let j = 0; j < paramSet.paramNames.length; j++) {
                    if(bindNames[i]==paramSet.paramNames[j]){
                        params.push(paramSet.paramValues[j]);
                        found=true;
                        break;
                    }
                }
                if(!found){
                    throw new Error(`the param ${bindNames[i]} is missing in the query`);
                }
            }
        }

        return params;
    }

    public generateBingIdentifier(query:string, map:Map<string, string[]>):string {
		let result:string = query;
		if (result == null) {
			return null;
		}
		
        map.forEach((value: string[], key: string) => {
            result = result.replace(new RegExp("<"+key+">", 'g'), this.getBingIdentifier(key, value.length));
        });
		
		return result;
	}

	private getBingIdentifier(key:string, size:number):string {
		let output:string = "";
		for (let i = 0; i < size; i++) {
			output += ":"+key+"_"+i;
			if(i<size-1) {
				output = output+",";
			}
		}
		return output;
    }
    
    public addInClauseBind(params: ParamSet, typesBindMap: Map<string, string[]>) {
        typesBindMap.forEach((value: string[], key: string) => {
            for (let i = 0; i < value.length; i++) {
                params.addParam(key+"_"+i, value[i]);
			}
        });
	}

    private async executeQueryStatement<T>(query: string, paramSet: any, mapper: ResultSetMapper<T>) : Promise<T[]>{
        
        let $this = this;
        let pr = new Promise<T[]>(function(resolve, reject){
            
            $this.connection.execute(query, paramSet).then(function(data){
                let result = [];
				if(data.rows.length>0){
					for (let i = 0; i < data.rows.length; i++) {
						for (let j = 0; j < data.metaData.length; j++) {
							if(!result[i]){
								result[i] = [];
							}
							result[i][data.metaData[j].name.toUpperCase()] = data.rows[i][j];
						}
					}
				}

                resolve(mapper.map(result));
                
            }).catch(err => reject(err))
        });

        return pr;
    }

    private async executeUpdateStatement(query: string, paramSet: any) : Promise<boolean>{
        
        let $this = this;
        let pr = new Promise<boolean>(function(resolve, reject){
            
            $this.connection.execute(query, paramSet, {autoCommit: true}).then(function(data){
                resolve(true);
            }).catch(err => reject(err))
        });

        return pr;
    }
}