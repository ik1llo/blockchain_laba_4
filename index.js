const attacker_success_probability = (q, threshold) => {
    const p = 1.0 - q;
    let z = 0;

    while (true) {
        const lambda = z * (q / p);
        let sum = 1.0;

        for (let k = 0; k <= z; k++) {
            let poisson = Math.exp(-lambda);
            
            for (let j = 1; j <= k; j++)
                poisson *= lambda / j;
            
            sum -= poisson * (1 - Math.pow(q / p, z - k));
        }

        if (Math.abs(sum) > threshold)
            z++;
        else
            return z;
    }
}

const thresholds = [1e-3, 1e-4, 1e-5];
for (let q = 0.1; q <= 0.45; q += 0.05) {
    console.log(`\nfor q = ${ q.toFixed(2) }:`);

    thresholds.forEach(threshold => {
        const min_blocks_amount = attacker_success_probability(q, threshold);
        console.log(`- threshold ${ threshold }: z = ${ min_blocks_amount }`);
    });
}