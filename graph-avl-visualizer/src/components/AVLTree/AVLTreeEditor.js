import React, { useState } from 'react';
import AVLTreeVisualizer from './AVLTreeVisualizer';
import AVLTree from '../../utils/AVLTreeUtils';
import './AVLTreeEditor.css';

const AVLTreeEditor = () => {
    const [tree] = useState(new AVLTree());
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);

    const handleInsert = () => {
        const value = prompt('Введіть значення для вставки:');
        if (value !== null) {
            const { nodes: updatedNodes, links: updatedLinks } = tree.insert(value);
            setNodes(updatedNodes);
            setLinks(updatedLinks);
            startAnimations(tree.animations);
        }
    };

    const handleDelete = () => {
        const value = prompt('Введіть значення для видалення:');
        if (value !== null) {
            const { nodes: updatedNodes, links: updatedLinks } = tree.delete(Number(value));
            setNodes(updatedNodes);
            setLinks(updatedLinks);
        }
    };

    const handleFind = () => {
        const value = parseInt(prompt('Введіть значення для пошуку:'), 10);
        if (!isNaN(value)) {
            const found = tree.find(value);
            startAnimations(tree.animations);
            setTimeout(() => {
                alert(found ? `Значення ${value} знайдено!` : `Значення ${value} не знайдено!`);
            }, tree.animations.length * 500);
        }
    };

    const handlePrint = () => {
        const output = tree.print();
        alert(`Значення в дереві: ${output.join(', ')}`);
    };

    const startAnimations = (animations) => {
        animations.forEach((animation, index) => {
            setTimeout(() => {
                const node = document.getElementById(`node-${animation.nodeId}`);
                if (animation.type === 'highlight' && node) {
                    node.style.fill = 'darkgreen';
                } else if (animation.type === 'found' && node) {
                    node.style.fill = 'orange';
                }
            }, index * 500);
        });

        setTimeout(() => {
            nodes.forEach((node) => {
                const element = document.getElementById(`node-${node.id}`);
                if (element) {
                    element.style.fill = 'lightgreen';
                }
            });
        }, animations.length * 500 + 500);
    };

    return (
        <div className="avl-tree-editor">
            <h1>AVL Tree</h1>
            <div className="top-controls">
                <button onClick={handleInsert}>Insert</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleFind}>Find</button>
                <button onClick={handlePrint}>Print</button>
            </div>

            <AVLTreeVisualizer nodes={nodes} links={links}/>
        </div>
    );
};

export default AVLTreeEditor;
