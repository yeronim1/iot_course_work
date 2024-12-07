let nodeCounter = 0; // Змінна для унікальної нумерації вузлів

class TreeNode {
    constructor(value, x, y) {
        this.id = nodeCounter++; // Унікальний ID вузла
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.x = x;
        this.y = y;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
        this.animations = [];
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this.animations.push({
            type: "rotateRight",
            nodeId: y.id,
            newNodeId: x.id,
        });

        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this.animations.push({
            type: "rotateLeft",
            nodeId: x.id,
            newNodeId: y.id,
        });

        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        return y;
    }

    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    insertValue(node, value) {
        if (!node) return new TreeNode(value, 800, 50);

        if (value <= node.value) {
            node.left = this.insertValue(node.left, value);
        } else {
            node.right = this.insertValue(node.right, value);
        }

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        const balance = this.getBalanceFactor(node);

        if (balance > 1 && value < node.left.value) return this.rotateRight(node);
        if (balance < -1 && value > node.right.value) return this.rotateLeft(node);
        if (balance > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }


    insert(value) {
        this.root = this.insertValue(this.root, value);
        return this.generateTreeData();
    }

    deleteValue(node, value) {
        if (!node) return node;

        if (value < node.value) {
            node.left = this.deleteValue(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteValue(node.right, value);
        } else {
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                const minLargerNode = this.getMinValueNode(node.right);
                node.value = minLargerNode.value;
                node.right = this.deleteValue(node.right, minLargerNode.value);
            }
        }

        if (!node) return node;

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        const balance = this.getBalanceFactor(node);

        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) return this.rotateRight(node);
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && this.getBalanceFactor(node.right) <= 0) return this.rotateLeft(node);
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    delete(value) {
        this.root = this.deleteValue(this.root, value);
        return this.generateTreeData();
    }

    findValue(node, value) {
        if (!node) {
            this.animations.push({ type: 'notFound', value });
            return false;
        }

        this.animations.push({
            type: 'highlight',
            nodeId: node.id,
        });

        if (Number(node.value) === value) {
            this.animations.push({ type: 'found', nodeId: node.id });
            return true;
        }
        if (value < node.value) return this.findValue(node.left, value);
        return this.findValue(node.right, value);
    }

    find(value) {
        return this.findValue(this.root, value);
    }

    printTree(node, result = []) {
        if (!node) return result;

        this.printTree(node.left, result);
        result.push(node.value);
        this.printTree(node.right, result);

        return result;
    }

    print() {
        return this.printTree(this.root);
    }

    getMinValueNode(node) {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }

    generateTreeData() {
        const nodes = [];
        const links = [];
        this.inOrderTraversal(this.root, 800, 50, 100, nodes, links);
        return { nodes, links };
    }

    inOrderTraversal(node, x, y, offset, nodes, links) {
        if (!node) return;

        if (node.left) {
            links.push({ source: node.id, target: node.left.id });
            this.inOrderTraversal(node.left, x - offset, y + 100, offset / 1.5, nodes, links);
        }

        nodes.push({
            id: node.id,
            value: node.value,
            x,
            y,
            height: node.height,
            balance: this.getBalanceFactor(node),
        });

        if (node.right) {
            links.push({ source: node.id, target: node.right.id });
            this.inOrderTraversal(node.right, x + offset, y + 100, offset / 1.5, nodes, links);
        }
    }
}

export default AVLTree;
