import { nanoid } from 'nanoid';
import { createRoot } from 'react-dom/client';
import { Component } from 'react';
import './App.scss';

const paramList: Param[] = [
    {
        id: 0,
        name: 'Название',
        type: 'string',
    },
    {
        id: 1,
        name: 'Описание',
        type: 'string',
    },
    {
        id: 2,
        name: 'Гарантия',
        type: 'string',
    },
    {
        id: 3,
        name: 'Производитель',
        type: 'string',
    },
    {
        id: 4,
        name: 'Артикул',
        type: 'string',
    },
    {
        id: 7,
        name: 'Мощность',
        type: 'string',
    },
    {
        id: 12,
        name: 'Размер',
        type: 'string',
    },
    {
        id: 13,
        name: 'Рейтинг',
        type: 'string',
    },
];

const productList: Product[] = [
    {
        productId: nanoid(5),
        model: {
            paramValues: [
                {
                    paramId: 0,
                    value: 'Утюг LG',
                },
                {
                    paramId: 1,
                    value: 'Утюг простой, бюджетный',
                },
                {
                    paramId: 2,
                    value: '1 год',
                },
                {
                    paramId: 3,
                    value: 'Китай',
                },
                {
                    paramId: 4,
                    value: '8234742',
                },
            ],
        },
    },
    {
        productId: nanoid(5),
        model: {
            paramValues: [
                {
                    paramId: 0,
                    value: 'Чайник ноунейм',
                },
                {
                    paramId: 1,
                    value: 'Чайник без бренда',
                },
                {
                    paramId: 2,
                    value: '6 месяцев',
                },
                {
                    paramId: 3,
                    value: 'Неизвестно',
                },
                {
                    paramId: 4,
                    value: '12341456',
                },
            ],
        },
    },
    {
        productId: nanoid(5),
        model: {
            paramValues: [
                {
                    paramId: 0,
                    value: 'Пылесос',
                },
                {
                    paramId: 1,
                    value: 'Пылесос моющий',
                },
                {
                    paramId: 2,
                    value: '3 месяцев',
                },
                {
                    paramId: 3,
                    value: 'Корея',
                },
                {
                    paramId: 4,
                    value: '525235325',
                },
                {
                    paramId: 7,
                    value: '3000w',
                },
            ],
        },
    },
];

interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Product {
    productId: string;
    model: Model;
}

interface ProductProps {
    product: Product;
    openParamEditor: (product: Product) => void;
}

class ProductItem extends Component<ProductProps> {
    constructor(props: ProductProps) {
        super(props);

        this.state = {
            product: props.product,
        };
    }

    render() {
        const { product, openParamEditor } = this.props;
        const { model } = product;

        return (
            <div className="product-item">
                {model &&
                    model.paramValues.length > 0 &&
                    model.paramValues.map((paramValue) => {
                        const { paramId, value } = paramValue;
                        const name = paramList.find((item) => item.id === paramId).name;
                        return (
                            <div key={paramId} className="product-item__row">
                                <b>{name}:</b> {value}
                            </div>
                        );
                    })}
                <button
                    onClick={() => {
                        openParamEditor(product);
                    }}
                >
                    редактировать
                </button>
            </div>
        );
    }
}

interface ProductListProps {
    productList: Product[];
    openParamEditor: (product: Product) => void;
}

class ProductList extends Component<ProductListProps> {
    constructor(props: ProductListProps) {
        super(props);
    }

    render() {
        const { productList, openParamEditor } = this.props;

        return (
            <div className="product-list">
                <h4>Список товаров</h4>
                {productList.map((product, index) => {
                    return <ProductItem openParamEditor={openParamEditor} product={product} key={index} />;
                })}
            </div>
        );
    }
}

interface ParamEditorState {
    paramList: Param[];
    paramsValue: Record<number, string>;
    paramsEditor: ParamValue[];
}

interface ParamEditorProps {
    productId?: string;
    params?: Param[];
    model?: Model;
    closeParamEditor: () => void;
    updateProductParam?: (productId: string, paramsValue: ParamValue[]) => void;
}

class ParamEditor extends Component<ParamEditorProps, ParamEditorState> {
    constructor(props: ParamEditorProps) {
        super(props);

        const initialParamValues: Record<number, string> = {};
        props.model.paramValues.forEach((paramValue) => {
            initialParamValues[paramValue.paramId] = paramValue.value;
        });

        this.state = {
            paramList: props.params,
            paramsValue: initialParamValues,
            paramsEditor: props.model.paramValues,
        };
    }

    getModel = (): Model => {
        const paramValues = this.state.paramsEditor;

        return { paramValues };
    };

    handleChange = (newValue: string, paramId: number) => {
        const newParamsValue = { ...this.state.paramsValue, [paramId]: newValue };
        const index = this.state.paramsEditor.findIndex((item) => item.paramId === paramId);
        const newParamsEditor = [...this.state.paramsEditor];
        if (index !== -1) {
            newParamsEditor[index].value = newValue;
        } else {
            newParamsEditor.push({ paramId, value: newValue });
        }

        this.setState({ paramsEditor: newParamsEditor, paramsValue: newParamsValue });
    };

    componentDidUpdate(prevProps: ParamEditorProps) {
        if (prevProps.model !== this.props.model) {
            const initialParamValues: Record<number, string> = {};
            this.props.model.paramValues.forEach((paramValue) => {
                initialParamValues[paramValue.paramId] = paramValue.value;
            });

            this.setState({
                paramsValue: initialParamValues,
                paramsEditor: this.props.model.paramValues,
            });
        }
    }

    render() {
        const { productId, updateProductParam, closeParamEditor } = this.props;
        const { paramList, paramsValue, paramsEditor } = this.state;

        return (
            <div className="param-editor">
                {paramList &&
                    paramList.length > 0 &&
                    paramList.map((param) => {
                        const id = param.id;
                        const name = param.name;
                        const value = paramsValue[param.id] || '';

                        return (
                            <div key={id} className="param-editor__item">
                                <label>{name}:</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        this.handleChange(e.target.value, id)
                                    }
                                />
                            </div>
                        );
                    })}

                <div className="param-editor__nav">
                    <button
                        className="param-editor__nav-btn"
                        onClick={() => updateProductParam(productId, paramsEditor)}
                    >
                        Обновить параметры
                    </button>
                    <button className="param-editor__nav-btn" onClick={() => closeParamEditor()}>
                        Отмена
                    </button>
                    <button className="param-editor__nav-btn" onClick={() => this.getModel()}>
                        Получить параметры
                    </button>
                </div>
            </div>
        );
    }
}

interface AppState {
    productList: Product[];
    params: Param[];
    toiggleEditor: boolean;
    paramEditor: ParamEditorProps | {};
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            productList: productList,
            params: paramList,
            toiggleEditor: false,
            paramEditor: {},
        };
    }

    openParamEditor = (product: Product) => {
        this.setState((prevState) => ({
            toiggleEditor: true,
            paramEditor: { ...product },
        }));
    };

    closeParamEditor = () => {
        this.setState((prevState) => ({
            toiggleEditor: false,
            paramEditor: {},
        }));
    };

    updateProductParam = (productId: string, paramsValue: ParamValue[]) => {
        const index = this.state.productList.findIndex((prod) => prod.productId === productId);
        const newProductList = this.state.productList;
        newProductList[index].model.paramValues = paramsValue.filter((param) => param.value !== '');
        this.setState({ productList: newProductList, toiggleEditor: false });
    };

    render() {
        const { toiggleEditor, paramEditor, params } = this.state;
        return (
            <div className="app">
                <div className="descr">
                    <p>У нас есть список товаров со схемой Model, которая содержить в себе значения параметров</p>
                    <p>
                        Мы можем отредактировать товар из списка, в компоненте ректора есть форма, эта форма имеет поля
                        со всеми существующими параметрами.
                    </p>
                    <p>
                        Если у товара есть значение параметра, то его видно и можно отредактировать. Если у товара нет
                        значения, то поле будет пустое, можно записать значение. Кнопка обновить выполнить обновления
                        параметров товара. Если очистить поле какого либо параметра и обновить продукт, то в карточке
                        продукта удаленное поле не будет отображаться (карточка товара отображает заполненные значения)
                    </p>
                    <p>
                        Кусок примера был на классовом компненте, поэтмоу я задание делал на классах (мог и на хуках).
                        Сделал в одном файле. <a href="">репозиторий</a>
                    </p>
                </div>
                <ProductList productList={this.state.productList} openParamEditor={this.openParamEditor} />
                {toiggleEditor && Object.keys(paramEditor).length > 0 && (
                    <ParamEditor
                        {...paramEditor}
                        params={params}
                        closeParamEditor={this.closeParamEditor}
                        updateProductParam={this.updateProductParam}
                    />
                )}
            </div>
        );
    }
}

const root = createRoot(document.getElementById('root'));

root.render(<App />);
