def time_to_depleted(battery_capacity, alternator_power, solar_power, load_power, inverter_efficiency, engine_power, current_capacity, delta_t):
    # Step 1: Calculate the total usable battery capacity
    total_battery_capacity = sum(battery_capacity)  # Sum of all battery capacities (Ah)

    # Step 2: Calculate the net power being drawn from the batteries or added to the batteries (input power minus output power)
    solar_output = solar_power * inverter_efficiency  # Solar power output in watts
    net_power = (alternator_power + solar_output - load_power - engine_power) * delta_t / 60  # Net power in watt-minutes
    net_current = net_power / 12  # Convert watt-minutes to ampere-minutes

    # Step 3: Calculate the remaining battery capacity as a function of time
    updated_capacity = current_capacity + net_current  # Update the current battery capacity
    updated_capacity = max(min(updated_capacity, total_battery_capacity), 0)  # Constrain the capacity between 0 and total_battery_capacity

    # Step 4: Estimate the time left until the batteries are depleted or fully charged
    if net_current < 0:
        time_left = -updated_capacity / net_current  # Time left until depletion
    elif net_current > 0:
        time_left = (total_battery_capacity - updated_capacity) / net_current  # Time left until fully charged
    else:
        time_left = float('inf')  # Infinite time left (no change in capacity)

    return time_left, updated_capacity

battery_capacity = [95, 95, 95]  # List of battery capacities in Ah
alternator_power = 130 * 12  # Alternator power in watts (assuming 12V)
solar_power = 300  # Solar panel power in watts
load_power = 1000  # Load power in watts (replace with real-time value)
inverter_efficiency = 0.8  # Power inverter efficiency
engine_power = 45 * 12  # Engine power in watts (assuming 12V)
current_capacity = sum(battery_capacity)  # Initial battery capacity (assuming fully charged)
delta_t = 1  # Time step in minutes

time_left, updated_capacity = time_to_depleted(battery_capacity, alternator_power, solar_power, load_power, inverter_efficiency, engine_power, current_capacity, delta_t)
print(f"Time left: {time_left} minutes")
print(f"Updated capacity: {updated_capacity} Ah")
